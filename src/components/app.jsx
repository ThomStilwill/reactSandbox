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
                <div class="logo">
                    <img src="/images/logo.jpeg" alt="logo"/>
                </div>

                <div class="title">
                    GTI Vehicle Maintenance Log
                    <div class="subtitle">
                        So, what's gonna break next?
                    </div>
                </div>
                <nav class="navbar">
                    <ul>
                        <li><NavLink to="home" activeStyle={{ backgroundColor: 'gray' }}>Home</NavLink></li>
                        <li><NavLink to="about" activeStyle={{ backgroundColor: 'gray' }}>About</NavLink></li>
                        <li><NavLink to="log" activeStyle={{ backgroundColor: 'gray' }}>Log</NavLink></li>
                    </ul>
                </nav>
            </header>
            
            <Outlet/>
            
            <footer>
                <div class="footer-left"></div>
                <div class="footer-right">&copy; 2018 - Thom Stilwill</div>
            </footer>
            </>
        );
    }
  }

  export default App;

  