const ProductModel = require('../models/ProductModel');

class ProductController {

    static async getAllProducts(req, res) {
        try {
            const products = await ProductModel.getAll();

            res.status(200).json(products);
        } catch (error) {
            console.error('Error when searching for products:', error);
            res.status(500).json({ message: 'Interal server error while retrieving products.' });
        }
    }

    static async getProductById(req, res) {
        try {
            const { id } = req.params;

            const product = await ProductModel.getById(id);

            if (product) {
                res.status(200).json(product);
            } else {
                res.status(400).json({ message: `Product with ID ${id} not found.` })
            }
        } catch (error) {
            console.error('Error searching for product by ID:', error);
            res.status(500).json({ message: 'Internal server error while retrieving product.' })
        }
    }

    static async createProduct(req, res) {
        try {
            const newProductData = req.body;

            const createProduct = await ProductModel.create(newProductData);

            res.status(201).json(createProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Internal server error while creating the product.' })
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;

            const wasUpdated = await ProductModel.update(id, productData);

            if (wasUpdated) {
                res.status(200).json({ message: `Product with ID ${id} updated successfuly.`, updateProduct: { id, ...productData } });
            } else {
                res.status(404).json({ message: `Product with ID ${id} not found.` })
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Internal server error during product update.' })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const wasDeleted = await ProductModel.delete(id);

            if (wasDeleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: `Product with ID ${id} not found.` })
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Internal server error while deleting the product.' })
        }
    }
};

module.exports = ProductController;