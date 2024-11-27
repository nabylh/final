import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

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

  // Fonction pour supprimer un utilisateur (exemple, à adapter selon vos besoins)
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
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun utilisateur trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
