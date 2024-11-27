import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ pseudo, email, password });

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo,
          email,
          password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Échec de la création du compte");
      }

      const data = await response.json();
      console.log(data);

      if (data.message === "Compte créé avec succès") {
        // Compte créé, redirection vers la page de connexion
        navigate("/login");
      } else {
        setError(data.message || "Erreur lors de la création du compte");
      }
    } catch (err) {
      console.error("Erreur lors de la création du compte", err);
      setError("Erreur lors de la création du compte, veuillez réessayer.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        <div className="form-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="Entrez votre pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Créer un compte
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
