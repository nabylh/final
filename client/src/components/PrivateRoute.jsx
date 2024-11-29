import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isSessionValid, setIsSessionValid] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Récupère les informations de l'utilisateur de localStorage

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include", // Inclure les cookies pour vérifier la session côté serveur
        });

        if (response.ok) {
          const data = await response.json();
          setIsSessionValid(data.sessionValid && user?.role === "admin");
        } else {
          setIsSessionValid(false); // La session est invalide
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);
        setIsSessionValid(false); // Défaut à false en cas d'erreur
      }
    };

    verifySession();
  }, [user]);

  // Si la session est invalide ou si l'utilisateur n'est pas admin, rediriger vers la page d'accueil
  if (isSessionValid === false) {
    return <Navigate to="/" replace />;
  }

  // Si la session est valide mais que l'utilisateur est admin, rediriger vers le tableau de bord
  if (isSessionValid && user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Si tout est valide, afficher les enfants
  return children;
};

export default PrivateRoute;
