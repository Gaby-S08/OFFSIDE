Este projeto é um sistema simples em PHP e MySQL para login, cadastro, edição e exclusão de produtos.

Como rodar o sistema?
Passo 1: Criar Banco de Dados
Crie um banco de dados chamado sistema e execute o seguinte SQL:

sql
Copiar código
CREATE DATABASE sistema;

USE sistema;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fornecedor_id INT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2),
    imagem VARCHAR(255),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);
Passo 2: Conexão com o Banco de Dados
No arquivo conexao.php, configure a conexão com seu banco de dados:

php
Copiar código
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistema";
Passo 3: Criar Usuário para Login
No banco de dados, insira um usuário para fazer login:

sql
Copiar código
INSERT INTO usuarios (usuario, senha) VALUES ('seu_usuario', MD5('sua_senha'));
Passo 4: Rodar o Sistema
Coloque os arquivos na pasta do servidor web (ex: htdocs no XAMPP).
Acesse http://localhost no navegador.
Faça login com o usuário criado e gerencie os produtos.
Funcionalidades
Login: Usuário e senha.
Cadastro de Produtos: Adicionar, editar e excluir produtos.
Upload de Imagens: Produtos podem ter imagens (80x80px).