import React, { useState } from "react";
import DOMPurify from 'dompurify';

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    msg: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    nameError: "",
    msgError: "",
  });

  const [sentMessage, setSentMessage] = useState("");

  // Fonction pour nettoyer l'entrée utilisateur avec DOMPurify
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);  // Utiliser DOMPurify pour désinfecter les entrées
  };

  // Gestion des changements d'input
  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);  // Appliquer la sanitisation

    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue, // Appliquer la sanitisation directement ici
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: "",
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    const newErrors = {};

    // Validation des champs
    if (!formData.name.trim()) {
      newErrors.nameError = "Le champ nom est obligatoire.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.emailError = "Le champ email est obligatoire.";
      valid = false;
    } else if (formData.email.length < 10) {
      newErrors.emailError = "L'email doit contenir au moins 10 caractères.";
      valid = false;
    }

    if (!formData.msg.trim()) {
      newErrors.msgError = "Le champ message est obligatoire.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Simulation de l'envoi du message et affichage de la réponse en JSON dans la console
    const response = {
      status: "success",
      message: "Votre message a bien été envoyé !",
      data: formData,
    };

    // Affichage de la réponse dans la console
    console.log("Réponse du serveur :", JSON.stringify(response, null, 2));

    // Mise à jour de l'état pour afficher un message de succès
    setSentMessage(response.message);
    setFormData({ email: "", name: "", msg: "" });
  };

  return (
    <div className="contact__container">
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            className="form__input"
          />
          {errors.nameError && (
            <p className="form__error-message">{errors.nameError}</p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="email" className="form__label">
            E-Mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            className="form__input"
          />
          {errors.emailError && (
            <p className="form__error-message">{errors.emailError}</p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="msg" className="form__label">
            Message
          </label>
          <textarea
            name="msg"
            value={formData.msg}
            onChange={handleChange}
            placeholder="Votre message ici..."
            className="form__textarea"
          />
          {errors.msgError && (
            <p className="form__error-message">{errors.msgError}</p>
          )}
        </div>

        <div className="form__group form__group--submit">
          <button type="submit" className="form__button">
            Envoyer
          </button>
          {sentMessage && (
            <p className="form__success-message">{sentMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Contact;
