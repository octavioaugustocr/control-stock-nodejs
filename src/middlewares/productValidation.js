const requiredFields = [
    { name: 'name', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'quantity_stock', type: 'number' }
];

const optionalFields = [
    { name: 'flavor', type: 'string' },
    { name: 'mark', type: 'string' },
    { name: 'manufacturer', type: 'string' },
    { name: 'due_date', type: 'string' }
];

const validateProductData = (req, res, next) => {
    const product = req.body;
    const errors = [];
    
    for (const field of requiredFields) {
        if (product.hasOwnProperty(field.name) || product[field.name] === null || product[field.name] === undefined) {
            errors.push(`The field '${field.name}' is required.`);
        } else if (field.type === 'number' && isNaN(Number(product[field.name]))) {
            errors.push(`The field '${field.name}' must be a number.`);
        } else if (field.type === 'string' && typeof product[field.name] !== 'string') {
            errors.push(`The field '${field.name}' must be a string.`);
        }
    }
    
    for (const field of optionalFields) {
        if (product.hasOwnProperty(field.name) && product[field.name] !== null && product[field.name] !== undefined) {
            if (field.type === 'string' && typeof product[field.name] !== 'string') {
                errors.push(`The field '${field.name}' must be a string.`);
            }
            
            if (field.name === 'due_date' && product[field.name]) {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(product[field.name])) {
                    errors.push(`The 'due_date' field must be in the format YYYY-MM-DD.`);
                }
            }
        }
    }
    
    if (product.hasOwnProperty('price') && Number(product.price) <= 0) {
        errors.push('The price should be a positive value.');
    }
    if (product.hasOwnProperty('quantity_stock') && Number(product.quantity_stock) < 0) {
        errors.push('The quantity in stock cannot be negative.');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Product data validation error.',
            errors: errors
        });
    }
    next();
};

module.exports = {
    validateProductData
};
