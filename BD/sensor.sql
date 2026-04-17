drop database if exists sensor;
CREATE DATABASE sensor;

-- Selecionar o banco
USE sensor;

-- Tabela leitura
CREATE TABLE leitura (
    id INT PRIMARY KEY AUTO_INCREMENT,
    datahora DATETIME,
    temperatura FLOAT,
    umidade FLOAT
);

-- Tabela usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(89),
    username VARCHAR(30),
    senha VARCHAR(15)
);