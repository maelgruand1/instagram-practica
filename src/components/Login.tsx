import React, { useState } from "react";
import './Login.css';
import User from "./modules/User";

interface LoginProps {
    onLoginSuccess: (username: string) => void;
}

export const AdminUser = new User(0, "Admin", "root");
export const MaelUser = new User(1, "Mael", "12345");

function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const connect = (): boolean => {
        if (username.trim() === "" || password.trim() === "") {
            setMessage("Error contraseña vacia");
            return false;
        }
        if (
            !(
                (username === AdminUser.getName() && password === AdminUser.getPassword()) ||
                (username === MaelUser.getName() && password === MaelUser.getPassword())
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
            onLoginSuccess(username); // transmet le nom d'utilisateur après une connexion réussie
        } else {
            setMessage("Error login");
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
