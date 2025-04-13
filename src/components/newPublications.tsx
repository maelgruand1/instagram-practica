import React from "react";
import { useState } from "react";

import './Publications.css';
import Publications from "./Publications";

function NewPublication(){
    const [page, setPage] = useState("plus");

    const renderPage = () => {
        switch (page) {
            case "publications":
                return <Publications />;
            default:
                return (
                    <div className="newPub">
                        <h1>New publication</h1>
                        <button onClick={() => setPage("publications")}>
                            Return to publications
                        </button>
                    </div>
                );
        }
    };

    return renderPage();
}

export default NewPublication;
