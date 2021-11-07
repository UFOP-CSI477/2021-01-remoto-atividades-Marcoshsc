<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de produtos</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles.css"/>
</head>
<body>
  <h1>Produtos</h1>
  <a href="insertView.php">Inserir</a>
   <table class="table">
  <thead>
    <tr>
      <th>Código</th>
      <th>Nome</th>
      <th>Unidade de medida</th>
    </tr>
   </thead>
   <tbody>

      <?php 
          while($p = $produtos->fetch()) {
            echo "<tr>";
              echo "<td>" .$p["id"] . "</td>\n";
              echo "<td>" .$p["nome"] . "</td>\n";
              echo "<td>" .$p["um"] . "</td>\n";
            echo "</tr>";
          }
      ?>
  </tbody>
</table> 
    
</body>
</html>