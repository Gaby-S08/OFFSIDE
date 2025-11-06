<?php include('valida_sessao.php'); ?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel Principal</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Bem-vindo, <?php echo $_SESSION['usuario']; ?></h2>
        <ul class="menu">
            <li><a href="cadastro_fornecedor.php">Cadastro de Fornecedores</a></li>
            <li><a href="cadastro_produto.php">Cadastro de Produtos</a></li>
            <li><a href="listagem_produtos.php">Listagem de Produtos</a></li>
            <li><a href="logout.php">Sair</a></li>
        </ul>
    </div>
</body>
</html>
