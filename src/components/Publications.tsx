import React, { JSX, useEffect, useState } from "react";
import './Publications.css';
import NewPublication from "./newPublications";
import Login from "./Login";
import Storage, { Publication } from "./modules/Storage";
import PublicationManager from "./modules/PublicationManager";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const storage = new Storage();
const pubManager = new PublicationManager();

// Ajout d'un état local pour gérer le nom d'utilisateur
function Publications() {
    const [page, setPage] = useState("publications");
    const [publications, setPublications] = useState<Publication[]>([]);
    const [username, setUsername] = useState<string>("Invitado");  // Valeur initiale par défaut
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Récupérer les publications
    useEffect(() => {
        const fetchPublications = async () => {
            await storage.init();
            const pubs = await storage.getAllPublications();
            setPublications(pubs);
        };
        fetchPublications();
    }, []);

    // Fonction pour gérer le succès de la connexion
    const onLoginSuccess = (username: string) => {
        setUsername(username);  // Mettre à jour l'état avec le nom d'utilisateur connecté
    };

    // Fonction de suppression d'une publication
    // Fonction pour gérer le clic gauche sur une publication
const handleLeftClick = (id: number) => {
    console.log("Publication clicked with ID:", id); // Vérifier l'ID sélectionné
    setSelectedId(id); // Définir l'ID de la publication sélectionnée
    setShowModal(true); // Afficher la modal de confirmation
};

// Fonction de suppression d'une publication
const confirmDelete = async () => {
    console.log("Deleting publication with ID:", selectedId); // Vérifier l'ID sélectionné
    if (selectedId !== null) {
        pubManager.delete(selectedId); // Supprimer en mémoire
        await storage.deletePublication(selectedId); // Supprimer de IndexedDB
        setPublications(pubManager.getAll()); // Mettre à jour l'état des publications
        setShowModal(false); // Fermer la modal
        setSelectedId(null);
    }
};


    // Fonction de rendu de la page
    const renderPage = (): JSX.Element => {
        if (username === "Invitado") {
            return <p>Please log in to see publications.</p>;
        }

        switch (page) {
            case "plus":
                return <NewPublication username={username} />;

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
                                    <div
                                        key={pub.id}
                                        className="publication-card"
                                        onClick={() => handleLeftClick(pub.id)} // Appel à la méthode handleLeftClick
                                    >
                                        <img src={pub.image} alt={pub.title} />
                                        <p><strong>Created by {pub.username}</strong></p>
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

    return (
        <div>
            {/* Afficher le formulaire de login seulement si l'utilisateur n'est pas connecté */}
            {username === "Invitado" && <Login onLoginSuccess={onLoginSuccess} />}

            {renderPage()}

            {/* Dialog de confirmation pour la suppression */}
            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Publication"}</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this publication?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Publications;
