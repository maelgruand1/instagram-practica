import React, { useEffect } from "react";
import './Profile.css';

interface PerfilProps {
    username: string;
}

function Perfil({ username }: PerfilProps) {
    useEffect(() => {
        alert(`Hola ${username ? username : "Invitado"}`);
    }, []); // [] = ne se déclenche qu'une fois au montage du composant

    return (
        <div className="profile">
            <h1>Perfil</h1>
            <p>Nombre : {username ? username : "Invitado"}</p>
            
        </div>
    );
}

export default Perfil;
