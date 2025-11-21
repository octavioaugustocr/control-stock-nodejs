const pool = require('../config/db');

class ProductModel {

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    };

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ?', [id])
        return rows[0];
    }

    static async create(product) {
        const { name, price, flavor, mark, manufacturer, due_date, quantity_stock } = product;

        const [result] = await pool.query(
            'INSERT INTO products (name, price, flavor, mark, manufacturer, due_date, quantity_stock) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, price, flavor, mark, manufacturer, due_date, quantity_stock]
        );

        return { id: result.insertId, ...product };
    }

    static async update(id, product) {
        const { name, price, flavor, mark, manufacturer, due_date, quantity_stock } = product;

        const [result] = await pool.query(
            'UPDATE products SET name = ?, price = ?, flavor = ?, manufacturer = ?, due_date = ?, quantity_stock = ? WHERE id_product = ?', [name, price, flavor, mark, manufacturer, due_date, quantity_stock, id]
        );

        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM products WHERE id_product = ?', [id]
        );

        return result.affectedRows > 0;
    }
};

module.exports = ProductModel;