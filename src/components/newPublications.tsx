import React, { useEffect, useState } from "react";
import './Publications.css';
import Storage, { Publication } from "./modules/Storage";
import PublicationManager from "./modules/PublicationManager";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const storage = new Storage();
const pubManager = new PublicationManager();

interface NewPublicationProps {
    username: string;
    onNewPublication?: () => void; // ← callback après ajout
}

function NewPublication({ username, onNewPublication }: NewPublicationProps) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [publications, setPublications] = useState<Publication[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const setup = async () => {
            await storage.init();
            const pubs = await storage.getAllPublications();
            pubs.forEach(pub => 
                pubManager.create(pub.title, pub.username, pub.image, pub.dateSent)
            );
            setPublications(pubManager.getAll());
        };
        setup();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPub = pubManager.create(username, title, image, new Date().toISOString()); // Ajout de la date d'envoi
        await storage.addPublication(username, newPub.title, newPub.image); // Ajout de la date d'envoi dans le stockage

        setPublications(pubManager.getAll());
        setTitle("");
        setImage("");

        if (onNewPublication) {
            onNewPublication(); // ← callback vers le parent
        }
    };

    const handleLeftClick = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (selectedId !== null) {
            pubManager.delete(selectedId);
            await storage.deletePublication(selectedId);
            setPublications(pubManager.getAll());
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
                        <p><small>Sent on: {new Date(pub.dateSent).toLocaleDateString()}</small></p> {/* Affichage de la date d'envoi */}
                    </div>
                ))}
            </div>

            {/* Modal de confirmation */}
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    <Typography>Do you want to delete this publication?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewPublication;
