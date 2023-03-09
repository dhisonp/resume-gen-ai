# Resume Generator with AI
## What is this actually?
A simple, barebones resume generator powered using OpenAI's Chat-GPT. Takes user data such as name, experience, and skillset and automatically generates a realistic resume based on the given parameters. This project was initially started with the sole purpose of exploring the possibilities of the young OpenAI API, but it easily piques my interest in the subject and definitely am looking to improve the app over time while continuously learning and discovering the potential of AI in our everyday lives. 

## How to Install
From the root directory,
```
cd client
npm install
cd ../server
npm install
```
Ensure everything's installed, then
```
npm start
cd ../client
npm start
```
Ensure ports 3000 and 4000 are available for the client and server respectively.


## Tech Stack and Libraries
### Client
- React
- Axios
- React Router
### Server
- OpenAI Chat-GPT
- Express
- Multer
- Nodemon
- Cors

## Feature/Future Plans
- Support of more detailed fields for a more authentic and accurate render– these include but not limited to per-job responsibilities, technical skills, personal projects, education and certificates.
- Add responsibility rows to past jobs along with the current job.
- Integration with Notion– feature to allow exporting the resume into a Notion page utilizing the Notion API.
- A more concise Loading page. At the moment, it's a static page with some "Loading.. Please Wait" on it. A better Loading page will detail a progress bar (for user feedback) and an error message in case of one.
- Improvement in the print-to-PDF module and it's formating towards standard prints such as US Letter and A4.
- A save feature (into JSON, probably) that allows user to save settings/parameters should they want to edit the details without doing the whole thing from ground zero.
- General resume formating improvements.

### Specific/Minor Details
- Ensure that bullet points are always accompanied by line breaks.
- UI Improvements (Front-End)
- An option to pick a font family– notably industry standards such as Calibri and/or Arial.
- A share option to social media platforms in the form of a .jpg snapshot.

Also plans to launch the app into a hosting site for everybody to use!– after everything's done and tidy.

## Known Bugs
- App will stuck in the static Loading page when an error occurs during processing.
- Weird formatting when Printing to PDF. Further tweaking required.
- Uploaded image gets squished when it's not in 1:1 format.
- Occasional missing line breaks in some of the bullet points.