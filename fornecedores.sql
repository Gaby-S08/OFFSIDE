CREATE DATABASE IF NOT EXISTS cadastro_fornecedores_produtos;
USE cadastro_fornecedores_produtos;

-- ===============================
-- TABELA: Fornecedores
-- ===============================
CREATE TABLE fornecedores (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome_fornecedor VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    endereco VARCHAR(150),
    telefone VARCHAR(20),
    email VARCHAR(100),
    observacoes TEXT
);

-- Inserindo fornecedores
INSERT INTO fornecedores (nome_fornecedor, cnpj, endereco, telefone, email, observacoes)
VALUES 

('Tecno Têxtil LTDA', '12.345.678/0001-90', 'Rua das Fábricas, 120', '(11) 99999-1111', 'contato@tecnotextil.com.br', 'Fornecedor principal de tecidos.'),
('ModaBrasil Distribuidora', '98.765.432/0001-55', 'Av. Central, 200', '(21) 98888-2222', 'vendas@modabrasil.com', 'Entrega em todo o Brasil.'),
('Confecções Alfa', '33.222.111/0001-77', 'Rua São Paulo, 345', '(31) 97777-3333', 'atendimento@confalfa.com', 'Especialista em uniformes.'),
('Têxtil Premium', '44.111.222/0001-66', 'Rua das Indústrias, 500', '(41) 96666-4444', 'contato@textilpremium.com', 'Tecidos finos e sob medida.'),
('Global Fashion Import', '55.888.999/0001-22', 'Av. Europa, 1200', '(51) 95555-6666', 'import@globalfashion.com', 'Importação de produtos internacionais.'),
('Estilo Urbano LTDA', '66.777.555/0001-44', 'Rua da Moda, 89', '(61) 94444-7777', 'vendas@estilourbano.com', 'Fornecedor de roupas casuais e esportivas.');
);