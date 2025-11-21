const express = require('express');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/v1/products', productRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API running!',
        endpoints: [
            'GET /v1/products',
            'GET /v1/products/:id',
            'POST /v1/products',
            'PUT /v1/products/:id',
            'DELETE /v1/products/:id'
        ]
    })
});

app.use((req, res, next) => {
    const error = new Error('Route not found!')
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}}`);
    console.log(`go to: http://localhost:${PORT}}`);
});