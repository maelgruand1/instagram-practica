import React, { useEffect, useState } from "react";
import './Publications.css';
import NewPublication from "./newPublications";
import Storage, { Publication } from "./modules/Storage";

const storage = new Storage();

function Publications() {
    const [page, setPage] = useState("publications");
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        const fetchPublications = async () => {
            await storage.init(); // Attendre que IndexedDB soit prêt
            const pubs = await storage.getAllPublications();
            setPublications(pubs);
        };
        fetchPublications();
    }, []);

    const renderPage = () => {
        switch (page) {
            case "plus":
                return <NewPublication />;
            default:
                return (
                    <div className="publication">
                        <h1>Publications</h1>
                        <button onClick={() => setPage("plus")}>
                            Create a new publication
                        </button>

                        <div className="publication-list">
                            {publications.length > 0 ? (
                                publications.map((pub) => (
                                    <div key={pub.id} className="publication-card">
                                        <img src={pub.image} alt={pub.title} />
                                        <p>{pub.title}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No publications found.</p>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return renderPage();
}

export default Publications;
