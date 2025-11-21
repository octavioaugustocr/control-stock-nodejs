const express = require('express');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API running!',
        endpoints: [
            'GET /api/products',
            'GET /api/products/:id',
            'POST /api/products',
            'PUT /api/products/:id',
            'DELETE /api/products/:id'
        ]
    })
});

app.use((req, res, next) => {
    const error = new Error('Route not found!')
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}}`);
    console.log(`go to: http://localhost:${PORT}}`);
});