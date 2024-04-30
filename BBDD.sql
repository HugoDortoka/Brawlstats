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

-- <img src="https://cdn.brawlstats.com/player-thumbnails/28000244.png"></img>