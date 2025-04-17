import React, { useEffect } from "react";
import './Profile.css';

interface PerfilProps {
    username: string;
}

function Perfil({ username }: PerfilProps) {
    return (
        <div className="profile">
            <h1>Perfil</h1>
            <p>Nombre : {username ? username : "Invitado"}</p>
            
        </div>
    );
}

export default Perfil;
