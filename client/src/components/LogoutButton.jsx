import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                credentials: 'include', // Permet d'envoyer les cookies (session) avec la requête
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Si la déconnexion réussit, rediriger l'utilisateur vers la page d'accueil ou login
                navigate('/login');
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Se déconnecter</button>
    );
};

export default LogoutButton;
