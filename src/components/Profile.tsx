import React from "react";
import './Profile.css';

interface PerfilProps {
    username: string;
}

function Perfil({ username }: PerfilProps){

    return (
        <div className="profile">
            <h1>Perfil</h1>
            {/* Nombre de perfil récupérer du login grâce au soulevement d'état */}
            <p>Nombre : {username ? username : "Invité"}</p>
            
        </div>
    )
   
}

export default Perfil;
