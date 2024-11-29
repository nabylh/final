// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Récupère les informations de l'utilisateur de localStorage ou d'un contexte

  // Vérifier si l'utilisateur est connecté et a le rôle d'admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />; // Redirige vers la page d'accueil si non connecté ou pas admin
  }

  return children; // Affiche les enfants (la route protégée) si l'utilisateur est authentifié et admin
};

export default PrivateRoute;
