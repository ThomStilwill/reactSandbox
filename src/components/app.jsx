import React from 'react';
import {
    NavLink,
    Outlet
  } from "react-router-dom";
  
class App extends React.Component {
    render() {
        return (
            <>
            <header>
                <div className="logo">
                    <img src="/images/logo.jpeg" alt="logo"/>
                </div>

                <div className="title">
                    GTI Vehicle Maintenance Log
                    <div className="subtitle">
                        So, what's gonna break next?
                    </div>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><NavLink to="home" activeStyle={{ backgroundColor: 'gray' }}>Home</NavLink></li>
                        <li><NavLink to="game" activeStyle={{ backgroundColor: 'gray' }}>Game</NavLink></li>
                        <li><NavLink to="cards" activeStyle={{ backgroundColor: 'gray' }}>Cards</NavLink></li>
                        <li><NavLink to="stars" activeStyle={{ backgroundColor: 'gray' }}>Stars</NavLink></li>
                        <li><NavLink to="about" activeStyle={{ backgroundColor: 'gray' }}>About</NavLink></li>
                        <li><NavLink to="log" activeStyle={{ backgroundColor: 'gray' }}>Log</NavLink></li>
                    </ul>
                </nav>
            </header>
            
            <Outlet/>
            
            <footer>
                <div className="footer-left"></div>
                <div className="footer-right">&copy; 2018 - Thom Stilwill</div>
            </footer>
            </>
        );
    }
  }

  export default App;

  