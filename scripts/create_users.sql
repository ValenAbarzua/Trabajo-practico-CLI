/*
    Script para crear la base de datos y la tabla de usuarios.
    Se puede ejecutar con el comando: mysql -u root -p < create_users.sql
*/
CREATE DATABASE IF NOT EXISTS cli_crud;
USE cli_crud;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);