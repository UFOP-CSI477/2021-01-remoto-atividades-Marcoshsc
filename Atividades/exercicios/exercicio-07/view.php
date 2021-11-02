<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de estados</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
   <table class="table">
  <thead>
    <tr>
      <th>Código</th>
      <th>Nome</th>
      <th>Sigla</th>
    </tr>
   </thead>
   <tbody>

      <?php 
          while($e = $estados->fetch()) {
            echo "<tr>";
              echo "<td>" .$e["id"] . "</td>\n";
              echo "<td>" .$e["nome"] . "</td>\n";
              echo "<td>" .$e["sigla"] . "</td>\n";
            echo "</tr>";
          }
      ?>
  </tbody>
</table> 
    <ol>
        <?php 
            while($e = $estados->fetch()) {
                echo "<li>" .$e["nome"] . "-" . $e['sigla'] . "</li>\n";
            }
        ?>
    </ol>
    
</body>
</html>