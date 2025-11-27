-- TABELA: Produtos
-- ===============================
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    codigo_produto VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    quantidade_estoque INT DEFAULT 0,
    preco_unitario 
    DECIMAL(10,2),
    id_fornecedor INT,
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id_fornecedor)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);


-- ===============================
-- INSERÇÃO DE PRODUTOS
-- ===============================
INSERT INTO produtos (nome_produto, codigo_produto, descricao, quantidade_estoque, preco_unitario, id_fornecedor)
VALUES
('Camiseta Básica', 'P001', 'Camiseta 100% algodão', 150, 39.90, 1),
('Calça Jeans Tradicional', 'P002', 'Calça jeans azul escuro', 80, 99.90, 2),
('Jaqueta Jeans', 'P003', 'Jaqueta jeans com forro leve', 50, 159.90, 2),
('Blusa Feminina', 'P004', 'Blusa leve de viscose', 120, 79.90, 4),
('Uniforme Escolar', 'P005', 'Conjunto completo (camisa + calça)', 200, 119.90, 3),
('Camisa Polo', 'P006', 'Camisa polo algodão pique', 90, 69.90, 1),
('Moletom Capuz', 'P007', 'Moletom com capuz e bolso frontal', 70, 129.90, 6),
('Short Jeans Feminino', 'P008', 'Short jeans cintura alta', 110, 89.90, 2),
('Saia Midi', 'P009', 'Saia midi estampada', 65, 99.90, 4),
('Vestido Floral', 'P010', 'Vestido leve com estampa floral', 75, 139.90, 5),
('Boné Estampado', 'P011', 'Boné estilo urbano ajustável', 200, 49.90, 6),
('Calça Social Masculina', 'P012', 'Calça social de tecido leve', 50, 119.90, 3),
('Blazer Feminino', 'P013', 'Blazer estruturado com ombreira', 40, 199.90, 4),
('Camisa Social Branca', 'P014', 'Camisa branca tradicional', 150, 89.90, 1),
('Tênis Casual', 'P015', 'Tênis leve e confortável', 100, 179.90, 6),
('Camiseta Básica', 'P001', 'Camiseta 100% algodão', 150, 39.90, 1),
('Calça Jeans', 'P002', 'Calça jeans azul tradicional', 80, 99.90, 2);