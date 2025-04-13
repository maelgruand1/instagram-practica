import React, { useState } from "react";
import './Login.css';

interface User {
    id: number;
    name: string;
    password: string;
}

interface LoginProps {
    onLoginSuccess: (username: string) => void;
}

const Admin: User = {
    id: 0,
    name: "admin",
    password: "root",
};

const Mael: User = {
    id: 1,
    name: "Mael",
    password: "12345",
};

function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [perfil, setPerfil] = useState("");

    const connect = (): boolean => {
        if (username.trim() === "" || password.trim() === "") {
            setMessage("Error contraseña vacia");
            return false;
        }
        if (
            !(
                (username === Admin.name && password === Admin.password) ||
                (username === Mael.name && password === Mael.password)
            )
        ) {
            setMessage("Error credentiales incorrectas");
            return false;
        }
        setMessage("Authentifié");
        return true;
    };

    const auth = () => {
        const connected = connect();
        if (connected) {
            setPerfil(username);
            onLoginSuccess(username); // transmet au parent
        } else {
            setPerfil("Error login");
        }
    };

    return (
        <div className="login-page">
            <h3>Perfil</h3>
            <div className="form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br />
                <button onClick={auth}>Validar</button>
            </div>
            <p id="message" style={{ color: message.startsWith("Error") ? "#f00" : "#0f0" }}>
                {message}
            </p>
        </div>
    );
}

export default Login;
