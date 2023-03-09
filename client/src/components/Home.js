import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Home = ({ setResult }) => {
    // Form Data
    const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [headshot, setHeadshot] = useState(null);
    const [companyInfo, setCompanyInfo] = useState([
        { name: "", position: "" },
    ]);
    // Utility
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handlers
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("headshotImage", headshot, headshot.name);
        data.append("fullName", fullName);
        data.append("currentPosition", currentPosition);
        data.append("currentLength", currentLength);
        data.append("currentTechnologies", currentTechnologies);
        data.append("workHistory", JSON.stringify(companyInfo));
        axios
            .post("http://localhost:4000/resume/create", data, {})
            .then((res) => {
                if (res.data.message) {
                    // console.log(res.data.data);
                    console.log(res);
                    setResult(res.data.data);
                    navigate("/resume");
                }
            })
            .catch((err) => console.error(err));
        setLoading(true);
    };

    const handleAddCompany = () =>
        setCompanyInfo([...companyInfo, { name: "", position: "" }]);

    const handleRemoveCompany = (index) => {
        const list = [...companyInfo];
        list.splice(index, 1);
        setCompanyInfo(list);
    };

    const handleUpdateCompany = (e, index) => {
        const { name, value } = e.target;
        const list = [...companyInfo];
        list[index][name] = value;
        setCompanyInfo(list);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="app">
            <h1>Resume Genie</h1>
            <p>Tell Mr. AI to do a resume quickie</p>
            <form
                onSubmit={handleFormSubmit}
                method="POST"
                encType="multipart/form-data"
            >
                <label htmlFor="fullName">Enter your full name here.</label>
                <input
                    type="text"
                    required
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <div className="nestedContainer">
                    <div>
                        <label htmlFor="currentPosition">
                            Current Position
                        </label>
                        <input
                            type="text"
                            required
                            name="currentPosition"
                            id="currentPosition"
                            className="currentInput"
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="currentLength">
                            For how many years?
                        </label>
                        <input
                            type="number"
                            required
                            name="currentLength"
                            id="currentLength"
                            className="currentInput"
                            value={currentLength}
                            onChange={(e) => setCurrentLength(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="currentTechnologies">Tech used</label>
                        <input
                            type="text"
                            required
                            name="currentTechnologies"
                            className="currentInput"
                            value={currentTechnologies}
                            onChange={(e) =>
                                setCurrentTechnologies(e.target.value)
                            }
                        />
                    </div>
                    <label htmlFor="photo">Upload headshot</label>
                    <input
                        type="file"
                        name="photo"
                        required
                        id="photo"
                        accept="image/x-png,image/jpeg"
                        onChange={(e) => setHeadshot(e.target.files[0])}
                    />
                    <button>Generate</button>
                </div>
                {companyInfo.map((company, index) => (
                    <div className="nestedContainer" key={index}>
                        <div className="companies">
                            <label htmlFor="name">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                            />
                        </div>
                        <div className="companies">
                            <label htmlFor="position">Position Held</label>
                            <input
                                type="text"
                                name="position"
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                            />
                        </div>

                        <div className="btn__group">
                            {companyInfo.length - 1 === index &&
                                companyInfo.length < 4 && (
                                    <button
                                        id="addBtn"
                                        onClick={handleAddCompany}
                                    >
                                        Add
                                    </button>
                                )}
                            {companyInfo.length > 1 && (
                                <button
                                    id="deleteBtn"
                                    onClick={() => handleRemoveCompany(index)}
                                >
                                    Del
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button>CREATE RESUME</button>
            </form>
        </div>
    );
};

export default Home;
