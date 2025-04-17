import React, { useState } from "react";
import './Publications.css';
import PublicationManager,  {Publication} from "./modules/PublicationManager";

const pubManager = new PublicationManager();

function NewPublication() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [publications, setPublications] = useState<Publication[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPub = pubManager.create(title, image);
        setPublications([...pubManager.getAll()]);
        setTitle("");
        setImage("");
    };

    const handleLeftClick = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedId !== null) {
            pubManager.delete(selectedId);
            setPublications([...pubManager.getAll()]);
            setShowModal(false);
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

            {showModal && (
                <div className="modal">
                    <p>Do you want to delete this publication?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={() => setShowModal(false)}>No</button>
                </div>
            )}
        </div>
    );
}

export default NewPublication;
