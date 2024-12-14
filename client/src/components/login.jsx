import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Le champ unique pour l'email ou pseudo
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(3); // Nombre de tentatives restantes
  const navigate = useNavigate(); // Hook de navigation

  const sanitizeInput = (input) => DOMPurify.sanitize(input);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedIdentifier = sanitizeInput(identifier);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: sanitizedIdentifier,
          password: sanitizedPassword,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Utilisateur non trouvé") {
          setError("Utilisateur non trouvé. Veuillez créer un compte.");
          return;
        }

        if (data.message === "Mot de passe incorrect") {
          const remainingAttempts = attempts - 1;
          setAttempts(remainingAttempts);

          if (remainingAttempts > 0) {
            setError(`Mot de passe incorrect. Il vous reste ${remainingAttempts} tentative(s).`);
          } else {
            setError("Trois tentatives échouées. Vous serez redirigé vers la page de création de compte.");
            setTimeout(() => {
              navigate("/signup");
            }, 1000); // Redirection après 2 secondes
          }
          return;
        }

        throw new Error(data.message || "Échec de la connexion");
      }

      if (data.message === "Connexion réussie") {
        // Stockage du pseudo dans le localStorage ou dans un état global
        localStorage.setItem("pseudo", data.user.pseudo);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Vérification du rôle et redirection vers la page appropriée
        if (data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion", err);
      setError("Erreur lors de la connexion, veuillez réessayer.");
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

        <button
          type="button"
          className="submit-button"
          onClick={() => navigate("/signup")}
        >
          Créer un compte
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
