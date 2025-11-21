CREATE DATABASE IF NOT EXISTS stock_control;
USE stock_control;

CREATE TABLE IF NOT EXISTS products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    flavor VARCHAR(100),
    mark VARCHAR(100),
    manufacturer VARCHAR(100),
    due_date DATE,
    quantity_stock INT NOT NULL
);