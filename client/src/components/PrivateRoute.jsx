import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isSessionValid, setIsSessionValid] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          setIsSessionValid(data.sessionValid && user?.role === "admin");
        } else {
          setIsSessionValid(false); 
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);
        setIsSessionValid(false); 
      }
    };

    verifySession();
  }, [user]);

  
  if (isSessionValid === false) {
    return <Navigate to="/" replace />;
  }

  
  if (isSessionValid && user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Si tout est valide, afficher les enfants
  return children;
};

export default PrivateRoute;
