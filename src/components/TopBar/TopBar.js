import React from 'react';
import './TopBar.css';
import logo from './assets/Kyzen.png';

const TopBar = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} alt="Kyzen Logo" id="kyzenlogo" />
            </header>
        </div>
    )
}

export default TopBar;
