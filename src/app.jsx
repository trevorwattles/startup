import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './saved/saved.css';
import './about/about.css';
import './login/login.css';
import './generate/generate.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Generate } from './generate/generate';
import { Saved } from './saved/saved';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <h1>Gigglr<sup>&reg;</sup></h1>

          <nav>
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
              <li><NavLink to="/generate" className={({ isActive }) => isActive ? "active-link" : ""}>Generate Jokes</NavLink></li>
              <li><NavLink to="/saved" className={({ isActive }) => isActive ? "active-link" : ""}>Saved Jokes</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
            </ul>
          </nav>

          <hr />
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/generate' element={<Generate />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Trevor Wattles</span>
          <br />
          <a href="https://github.com/trevorwattles/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
