CREATE DATABASE IF NOT EXISTS estoque_mais
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE estoque_mais;

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    unidade VARCHAR(20) NOT NULL DEFAULT 'un.',
    validade DATE,
    quantidade_minima INT NOT NULL DEFAULT 5,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela preparada para a Entrega 3
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('gerente', 'funcionario')
        NOT NULL DEFAULT 'funcionario',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);