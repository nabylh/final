import React, { useState, useEffect } from "react";

const dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null); // État pour gérer l'utilisateur en cours de modification
  const [updatedUser, setUpdatedUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    role: "",
    status: ""
  });

  // Charger les utilisateurs depuis l'API lors du premier rendu
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Pour inclure les cookies de session
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
        setError("Impossible de récupérer les utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Inclure les cookies de session
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      // Mettre à jour la liste des utilisateurs après la suppression
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur", err);
      setError("Impossible de supprimer l'utilisateur.");
    }
  };

  // Fonction pour gérer la modification d'un utilisateur
  const handleEditUser = (user) => {
    setEditUser(user);
    setUpdatedUser({
      pseudo: user.pseudo,
      email: user.email,
      password: "", // Initialiser avec une valeur vide pour le mot de passe
      role: user.role,
      status: user.status,
    });
  };

  // Fonction pour gérer la soumission du formulaire de modification
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }

      // Mettre à jour la liste des utilisateurs après la modification
      const updatedUsersList = users.map((user) =>
        user.id === editUser.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsersList);
      setEditUser(null); // Fermer le formulaire de modification
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
      setError("Impossible de mettre à jour l'utilisateur.");
    }
  };

  // Fonction pour gérer les changements dans le formulaire de modification
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  return (
    <div className="users-container">
      <h2>Liste des Utilisateurs</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.pseudo}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Modifier</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucun utilisateur trouvé</td>
            </tr>
          )}
        </tbody>
      </table>

      {editUser && (
        <div className="edit-form">
          <h3>Modifier l'utilisateur</h3>
          <form onSubmit={handleUpdateUser}>
            <div>
              <label>Pseudo</label>
              <input
                type="text"
                name="pseudo"
                value={updatedUser.pseudo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={updatedUser.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Rôle</label>
              <input
                type="text"
                name="role"
                value={updatedUser.role}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Statut</label>
              <input
                type="text"
                name="status"
                value={updatedUser.status}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Mettre à jour</button>
            <button type="button" onClick={() => setEditUser(null)}>Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default dashboard;
