import react from 'react';
import logo from './images/logo.png';
import Login from './Login';
import './Home.css';


function Home(){
    return (
        <div className='home'>
            <header>
                <img src={logo} alt="Logo" />
                <h1 className="mainTitle"><center>Instamedac</center></h1>
            </header>´
            
        </div>
    )
}

export default Home;

