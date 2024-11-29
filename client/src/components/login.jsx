import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Le champ unique pour l'email ou pseudo
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Identifier:", identifier); // Affiche l'identifiant
    console.log("Password:", password);

    try {
      // Utilisation de POST au lieu de GET pour l'authentification
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier, // Envoie le pseudo ou l'email
          password,
        }),
        credentials: "include", // Envoie les cookies de session
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        if (response.status === 404) {
          console.error("Utilisateur non trouvé");
          setError("Utilisateur non trouvé. Veuillez créer un compte.");
          navigate("/signup"); // Redirige vers la page "Créer un compte"
          return;
        }
        throw new Error(data.message || "Échec de la connexion");
      }

      if (data.message === "Connexion réussie") {
        console.log("Utilisateur connecté avec succès", data);

        // Stockage du pseudo dans le localStorage ou dans un état global
        localStorage.setItem("pseudo", data.user.pseudo);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Vérification du rôle et redirection vers la page appropriée
        if (data.user.role === "admin") {
          navigate("/dashboard"); // Redirection vers la page dashboard pour l'administrateur
        } else {
          navigate("/"); // Redirection vers la page principale pour les autres utilisateurs
        }
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion", err);
      setError("Erreur lors de la connexion, veuillez réessayer.");
      navigate("/signup"); // Redirige vers la page "Créer un compte" en cas d'erreur
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        <div className="form-group">
          <label htmlFor="identifier">Pseudo ou Email</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Entrez votre pseudo ou email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Se connecter
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
