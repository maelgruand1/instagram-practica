import React, { useState } from "react";
import './Publications.css';
import NewPublication from "./newPublications";

function Publications() {
    const [page, setPage] = useState("publications");

    const renderPage = () => {
        switch (page) {
            case "plus":
                return <NewPublication />;
            default:
                return (
                    <div className="publication">
                        <h1>Publication</h1>
                        <button onClick={() => setPage("plus")}>
                            Create a new publication
                        </button>
                    </div>
                );
        }
    };

    return renderPage();
}

export default Publications;
