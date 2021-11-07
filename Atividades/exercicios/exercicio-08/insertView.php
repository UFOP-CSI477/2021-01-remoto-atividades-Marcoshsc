<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inserir produtos</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles.css"/>
    <script type="text/javascript" src="scripts.js"></script>
</head>
<body>
    
    <form action="insertController.php" method="post" name="formCadastroProduto" id="form-cadastro" onsubmit="submit(event)">
    
        <div class="input-group mb-3">
            <label for="nome" class="input-group-text">Nome:</label>
            <input type="text" class="form-control" name="nome" id="nome">
        </div>
        <div class="input-group mb-3">
            <label for="um" class="input-group-text">Unidade de medida:</label>
            <input type="text" name="um" id="um" class="form-control">
        </div>
        <button class="btn btn-primary" type="submit">Inserir</button>
    </form>

    <a href="index.php">Voltar</a>
</body>
</html>