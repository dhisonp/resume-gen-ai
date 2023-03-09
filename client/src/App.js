import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

function App() {
    const [result, setResult] = useState({}); // Result from GPT API Call from server.

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home setResult={setResult} />} />
                    <Route
                        path="/resume"
                        element={<Resume result={result} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
