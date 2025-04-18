import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Err404 from "./components/404";
import Perfil from "./components/Profile";
import Publications from "./components/Publications";
import NewPublication from "./components/newPublications";


function App() {
    const [page, setPage] = useState("home");
    const [username, setUsername] = useState("");

    const renderPage = () => {
        switch (page) {
            case "home":
                return <Home/>;
            case "login":
                return <Login onLoginSuccess={(name) => {
                    setUsername(name);
                    setPage("home"); // Revenir à l'accueil après login
                }} />;
            case "publications":
                return <Publications/> ;
            case "perfil":
                return <Perfil username={username}/>
            case "plus":
                return <NewPublication/> ;
            default:
                return <Err404 />;
        }
    };

    return (
        <div>
            <Navbar onNavigate={setPage} />
          

            {renderPage()}
        </div>
    );
}

export default App;
