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
                        <br /><br />
                        <form>
                            {/* <button>Import link or file</button> */}
                            <input type="text" placeholder="Link de la imagen" />
                            <br /><br />
                            <input type="text" placeholder="Titulo de la publicación"/>
                            <button>Send publication</button>

                        </form>

                    </div>
                );
        }
    };

    return renderPage();
}

export default NewPublication;
