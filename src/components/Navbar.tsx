import React from "react";
import './Navbar.css';
import plusImg from './images/plus.png';

interface NavbarProps {
    onNavigate: (page: string) => void;
}

function Navbar({ onNavigate }: NavbarProps) {
    return (
        <div className="navbar">
            <button className="navlink" onClick={() => onNavigate("home")}>Home</button>
            <button className="navlink" onClick={() => onNavigate("publications")}>Publications</button>
            <button className="navlink" onClick={() => onNavigate("login")}>Login</button>
            <button className="navlink" onClick={() => onNavigate("perfil")}>Perfil</button>
            <img src={plusImg} alt="plus" className="plus" onClick={() => onNavigate("plus")}/>
            
        </div>
    );
}

export default Navbar;
