-- Crear la base de datos 'brawlstats'
CREATE DATABASE IF NOT EXISTS brawlstats;

-- Seleccionar la base de datos 'brawlstats'
USE brawlstats;

-- Crear la tabla 'administrator' con los campos 'email' y 'password'
CREATE TABLE IF NOT EXISTS administrator (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);

-- Insertar un registro en la tabla 'administrator' con la contraseña encriptada
INSERT INTO administrator (email, password)
VALUES ('admin@gmail.com', SHA2('admin', 256));

-- Crear la tabla 'sponsors' con los campos 'CIF', 'nom' y 'logo'
CREATE TABLE IF NOT EXISTS sponsors (
    CIF VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    PRIMARY KEY (CIF)
);

-- Insertar 4 registros en la tabla 'sponsors'
INSERT INTO sponsors (CIF, nom, logo) VALUES
('H70914163', 'Coca Cola', 'cocacola.png'),
('U14923668', 'VISA', 'visa.png'),
('V00420471', 'MasterCard', 'mastercard.png');

-- Crear la tabla 'users' con los campos 'email', 'tag' y 'password'
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    tag VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);

-- Insertar 2 registros en la tabla 'users'
INSERT INTO users (email, tag, password) VALUES
('lucas@gmail.com', 'LGGCV99', SHA2('lucas', 256)),
('hugo@gmail.com', '2P0CJV9', SHA2('hugo', 256));