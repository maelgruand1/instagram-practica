import React, { useEffect, useState } from "react";
import './Publications.css';
import Storage, { Publication } from "./modules/Storage";
import PublicationManager from "./modules/PublicationManager";

const storage = new Storage();
const pubManager = new PublicationManager();

interface NewPublicationProps {
    username: string;
    onNewPublication?: () => void; // Callback après ajout
}

function NewPublication({ username }: NewPublicationProps) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        const setup = async () => {
            await storage.init(); // Initialiser IndexedDB
            const pubs = await storage.getAllPublications(); // Charger depuis IndexedDB
            pubs.forEach(pub => pubManager.create(pub.title, pub.username, pub.image)); // Charger dans PublicationManager en mémoire
            setPublications(pubManager.getAll());
        };
        setup();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPub = pubManager.create(username, title, image); // Créer une publication en mémoire
        await storage.addPublication(username, newPub.title, newPub.image);
        setPublications(pubManager.getAll()); // Mettre à jour l'état des publications
        setTitle("");
        setImage("");
    };

    return (
        <div className="newPub">
            <h1>New publication</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Link de la imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br /><br />
                <input
                    type="text"
                    placeholder="Titulo de la publicación"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br /><br />
                <button type="submit">Send publication</button>
            </form>

            <div className="publication-list">
                {publications.map(pub => (
                    <div key={pub.id} className="publication-card">
                        <img src={pub.image} alt={pub.title} />
                        <p>{pub.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewPublication;
