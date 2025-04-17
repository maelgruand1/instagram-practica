import React, { useEffect, useState } from "react";
import './Publications.css';
import Storage, { Publication } from "./modules/Storage";
import PublicationManager from "./modules/PublicationManager";

const storage = new Storage();
const pubManager = new PublicationManager();

function NewPublication() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [publications, setPublications] = useState<Publication[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const setup = async () => {
            await storage.init(); // Initialiser IndexedDB
            const pubs = await storage.getAllPublications(); // Charger depuis IndexedDB
            pubs.forEach(pub => pubManager.create(pub.title, pub.image)); // Charger dans PublicationManager en mémoire
            setPublications(pubManager.getAll());
        };
        setup();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPub = pubManager.create(title, image); // Créer une publication en mémoire
        await storage.addPublication(newPub.title, newPub.image); // Ajouter dans IndexedDB
        setPublications(pubManager.getAll()); // Mettre à jour l'état des publications
        setTitle("");
        setImage("");
    };

    const handleLeftClick = (id: number) => {
        setSelectedId(id);
        setShowModal(true); // Ouvrir la modal
    };

    const confirmDelete = async () => {
        if (selectedId !== null) {
            pubManager.delete(selectedId); // Supprimer en mémoire
            await storage.deletePublication(selectedId); // Supprimer de IndexedDB
            setPublications(pubManager.getAll()); // Mettre à jour l'état des publications
            setShowModal(false); // Fermer la modal
            setSelectedId(null);
        }
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
                    <div
                        key={pub.id}
                        className="publication-card"
                        onClick={() => handleLeftClick(pub.id)}
                    >
                        <img src={pub.image} alt={pub.title} />
                        <p>{pub.title}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay"> {/* Fond de la modal */}
                    <div className="modal">
                        <p>Do you want to delete this publication?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={() => setShowModal(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewPublication;
