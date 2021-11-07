<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de produtos e estados</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles.css"/>
</head>
<body>
  <div class="container">
    <div class="element">
      <h1>Estados</h1>
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
                foreach($estados as $e) {
                  echo "<tr>";
                    echo "<td>" .$e->getId() . "</td>\n";
                    echo "<td>" .$e->getNome() . "</td>\n";
                    echo "<td>" .$e->getSigla() . "</td>\n";
                  echo "</tr>";
                }
            ?>
        </tbody>
       </table> 
    </div>
    <div class="element">
      <h1>Produtos</h1>
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
                foreach($produtos as $p) {
                  echo "<tr>";
                    echo "<td>" .$p->getId() . "</td>\n";
                    echo "<td>" .$p->getNome() . "</td>\n";
                    echo "<td>" .$p->getUm() . "</td>\n";
                  echo "</tr>";
                }
            ?>
        </tbody>
       </table> 
    </div>
  </div>
  
    
</body>
</html>