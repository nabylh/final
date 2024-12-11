import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center'}}>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h1>404 - Page Non Trouvée</h1>
    <p>Désolé, la page que vous recherchez n'existe pas.</p>
    <Link to="/">Retour à la page d'accueil</Link>
  </div>
);

export default NotFound;