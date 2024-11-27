import pool from "../config/db.js";

class Undercategory {
    static async findAll() {
        try {
            // Récupérer toutes les sous-catégories, y compris `image_url`
            const [rows] = await pool.query(`
                SELECT id, category_id, name, description, image_url
                FROM undercategory
                ORDER BY name
            `);
            
            return rows;
        } catch (error) {
            throw new Error(`Error fetching undercategories: ${error.message}`);
        }
    }
    

    static async findByName(name) {
        try {
            // Récupérer une sous-catégorie spécifique par son nom
            const [rows] = await pool.query(`
                SELECT id, category_id, name, description, image_url
                FROM undercategory
                WHERE name = ?
            `, [name]);
            return rows[0]; // Retourne la première sous-catégorie trouvée (ou undefined si aucune n'est trouvée)
        } catch (error) {
            throw new Error(`Error fetching undercategory by name: ${error.message}`);
        }
    }

    static async create({ category_id, name, description, image_url }) {
        try {
            // Insérer une nouvelle sous-catégorie avec `image_url`
            const [result] = await pool.query(
                "INSERT INTO undercategory (category_id, name, description, image_url) VALUES (?, ?, ?, ?)",
                [category_id, name, description, image_url]
            );

            return { id: result.insertId, category_id, name, description, image_url };
        } catch (error) {
            throw new Error(`Error creating undercategory: ${error.message}`);
        }
    }

    static async update({ category_id, name, description, image_url }, id) {
        try {
            // Mettre à jour une sous-catégorie, y compris `image_url`
            await pool.query(
                "UPDATE undercategory SET category_id = ?, name = ?, description = ?, image_url = ? WHERE id = ?",
                [category_id, name, description, image_url, id]
            );

            return { id, category_id, name, description, image_url };
        } catch (error) {
            throw new Error(`Error updating undercategory: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            // Supprimer une sous-catégorie
            await pool.query("DELETE FROM undercategory WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting undercategory: ${error.message}`);
        }
    }
}

export default Undercategory;
