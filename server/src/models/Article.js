// // src/models/Article.js

// import pool from "../config/db.js";

// class Article {
//     static async findAll() {
//         try {
//             const [rows] = await pool.query("SELECT * FROM article ORDER BY created_at DESC");
//             return rows;
//         } catch (error) {
//             throw new Error(`Error fetching articles: ${error.message}`);
//         }
//     }

//     static async findByName(name) {
//         try {
//             const [rows] = await pool.query(
//                 "SELECT * FROM article WHERE title LIKE ? ORDER BY created_at DESC",
//                 [`%${name}%`]
//             );
//             return rows;
//         } catch (error) {
//             throw new Error(`Error fetching articles by name: ${error.message}`);
//         }
//     }

//     static async findByUndercategoryName(name) {
//         try {
//             const [rows] = await pool.query(
//                 `SELECT a.id, a.title, a.content, a.created_at, u.name AS undercategory_name
//                  FROM article a
//                  JOIN undercategory u ON a.undercategory_id = u.id
//                  WHERE u.name = ?
//                  ORDER BY a.created_at DESC`,
//                 [name]
//             );
//             return rows;
//         } catch (error) {
//             throw new Error(`Error fetching articles for undercategory: ${error.message}`);
//         }
//     }
    

//     static async create({ title, content, source, undercategory_id }) {
//         try {
//             const [result] = await pool.query(
//                 "INSERT INTO article (title, content, source, undercategory_id) VALUES (?, ?, ?, ?)",
//                 [title, content, source, undercategory_id]
//             );
//             return { id: result.insertId, title, content, source, undercategory_id };
//         } catch (error) {
//             throw new Error(`Error creating article: ${error.message}`);
//         }
//     }

//     static async update({ title, content, source, undercategory_id }, id) {
//         try {
//             await pool.query(
//                 "UPDATE article SET title = ?, content = ?, source = ?, undercategory_id = ? WHERE id = ?",
//                 [title, content, source, undercategory_id, id]
//             );
//             return { id, title, content, source, undercategory_id };
//         } catch (error) {
//             throw new Error(`Error updating article: ${error.message}`);
//         }
//     }

//     static async remove(id) {
//         try {
//             await pool.query("DELETE FROM article WHERE id = ?", [id]);
//             return { id };
//         } catch (error) {
//             throw new Error(`Error deleting article: ${error.message}`);
//         }
//     }

// }

// export default Article;

// src/models/Article.js

import pool from "../config/db.js";

class Article {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT id, title, content, created_at, image_url FROM article ORDER BY created_at DESC");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching articles: ${error.message}`);
        }
    }

    static async findByName(name) {
        try {
            const [rows] = await pool.query(
                "SELECT id, title, content, created_at, image_url FROM article WHERE title LIKE ? ORDER BY created_at DESC",
                [`%${name}%`]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching articles by name: ${error.message}`);
        }
    }

    static async findByUndercategoryName(name) {
        try {
            const [rows] = await pool.query(
                `SELECT a.id, a.title, a.content, a.created_at, a.image_url, u.name AS undercategory_name
                 FROM article a
                 JOIN undercategory u ON a.undercategory_id = u.id
                 WHERE u.name = ?
                 ORDER BY a.created_at DESC`,
                [name]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching articles for undercategory: ${error.message}`);
        }
    }
    

    static async create({ title, content, source, undercategory_id, image_url }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO article (title, content, source, undercategory_id, image_url) VALUES (?, ?, ?, ?, ?)",
                [title, content, source, undercategory_id, image_url]
            );
            return { id: result.insertId, title, content, source, undercategory_id, image_url };
        } catch (error) {
            throw new Error(`Error creating article: ${error.message}`);
        }
    }

    static async update({ title, content, source, undercategory_id, image_url }, id) {
        try {
            await pool.query(
                "UPDATE article SET title = ?, content = ?, source = ?, undercategory_id = ?, image_url = ? WHERE id = ?",
                [title, content, source, undercategory_id, image_url, id]
            );
            return { id, title, content, source, undercategory_id, image_url };
        } catch (error) {
            throw new Error(`Error updating article: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            await pool.query("DELETE FROM article WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting article: ${error.message}`);
        }
    }

}

export default Article;


