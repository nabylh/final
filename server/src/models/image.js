// src/models/Image.js
import pool from "../config/db.js";

class Image {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM image ORDER BY display_order ASC");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching images: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM image WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching image by ID: ${error.message}`);
        }
    }

    static async create({ url, description, article_id, file_name, file_path }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO image (url, description, article_id, file_name, file_path) VALUES (?, ?, ?, ?, ?)",
                [url, description, article_id, file_name, file_path]
            );
            return { id: result.insertId, url, description, article_id, file_name, file_path };
        } catch (error) {
            throw new Error(`Error creating image: ${error.message}`);
        }
    }

    static async update({ url, description, article_id, file_name, file_path }, id) {
        try {
            await pool.query(
                "UPDATE image SET url = ?, description = ?, article_id = ?, file_name = ?, file_path = ? WHERE id = ?",
                [url, description, article_id, file_name, file_path, id]
            );
            return { id, url, description, article_id, file_name, file_path };
        } catch (error) {
            throw new Error(`Error updating image: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            await pool.query("DELETE FROM image WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting image: ${error.message}`);
        }
    }
}

export default Image;