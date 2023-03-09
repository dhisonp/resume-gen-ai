const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
// const { config } = require("process");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const generateID = () => Math.random().toString(36).substring(2, 10);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// OpenAI Config
require('dotenv').config();
let db = [];
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
};

// Routes
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    // console.log(req.body);
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;
    const workArray = JSON.parse(workHistory); // Reverts workHistory into its original DStr. from the client.
    const newEntry = {
        id: generateID(),
        fullName,
        image_url: `http://localhost:4000/uploads/${req.file.filename}`, // be careful of https instead of http!
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
    };

    // 'Converts' workArray into strings for processing
    const strWorkArray = () => {
        let string = "I have worked these companies: ";
        for (let i = 0; i < workArray.length; i++) {
            string += `${workArray[i].name} as a ${workArray[i].position}. `;
        }
        // console.log(`strWorkArray -> ${string}`)
        return string;
    };

    // Chat-GPT Prompts! The fun part!
    // deets are some reusable prompt details for the following rather specific prompts to avoid copy pasting.
    const deets = `I need a professional resume. My details are as follows-- Name: ${fullName}, Role: ${currentPosition} (${currentLength} years).`;
    const prompt_desc = `${deets} I utilize this technology to assist me with the job: ${currentTechnologies}. Please write me 85 words of summary (in first person writing).`;
    const prompt_points = `${deets} I excel in this technology: ${currentTechnologies}. Please write me 8 bullet points for the resume on what I am good at.`;
    const prompt_experience = `${deets} I have professionaly worked in ${workArray.length} companies. ${strWorkArray()} \n Please write me 45 words for each company separated in bullet points of my succession in the company (in first person writing).`;

    // API Call -> Generate GPT-3 Results!
    const desc = await GPTFunction(prompt_desc);
    const points = await GPTFunction(prompt_points);
    const experience = await GPTFunction(prompt_experience);
    // Place them into an object form
    const gptData = { desc, points, experience };
    // console.log(gptData);
    // Return the results to client
    const data = { ...newEntry, ...gptData };
    db.push(data);

    // Send response to client
    res.json({
        message: "Request fullfiled.",
        data,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
