import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ErrorPage from "./ErrorPage";

const Resume = ({ result }) => {
    const componentRef = useRef();
    // Print Handler
    // Make sure this is above the if statement for the ErrorPage– failing to do so will result in
    // an error where React Hooks are used in a conditional statement.
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${result.fullName} Resume`,
        onAfterPrint: () => alert("Print Successful!"),
    });

    if (JSON.stringify(result) === "{}") {
        return <ErrorPage />;
    }

    // Replace \n with the break tag.
    const replace_n = (string) => {
        return string.replace(/\n/g, "<br />");
    };

    return (
        <>
            <button onClick={handlePrint}>Print Resume</button>
            <main className="container" ref={componentRef}>
                <header className="header">
                    <div>
                        <h1>{result.fullName}</h1>
                        <p className="resumeTitle headerTitle">
                            {result.currentPosition} (
                            {result.currentTechnologies})
                        </p>
                        <p className="resumeTitle">
                            {result.currentLength}yrs of work experience.
                        </p>
                    </div>
                    <div>
                        <img
                            src={result.image_url}
                            alt={result.fullName}
                            className="resumeImage"
                        />
                    </div>
                </header>
                <div className="resumeBody">
                    <div>
                        <h2 className="resumeBodyTitle">Profile Summary</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replace_n(result.desc),
                            }}
                            className="resumeBodyContent"
                        />
                    </div>
                    <div>
                        <h2 className="resumeBodyTitle">Work History</h2>
                        {result.workHistory.map((work) => (
                            <p className="resumeBodyContent" key={work.name}>
                                <span style={{ fontWeight: "bold" }}>
                                    {work.name}
                                </span>{" "}
                                - {work.position}
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 className="resumeBodyTitle">Job Profile</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replace_n(result.experience),
                            }}
                            className="resumeBodyContent"
                        />
                    </div>
                    <div>
                        <h2 className="resumeBodyTitle">Responsibilites</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replace_n(result.points),
                            }}
                            className="resumeBodyContent"
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Resume;
