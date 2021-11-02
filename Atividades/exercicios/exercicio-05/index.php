<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exercicio 05 - PHP</title>
</head>
<body>
  <h1>Olá! Meu nome é Marcos Henrique</h1>
  <p>Estou cursando Sistemas Web 1 com o Fernando, e atualmente estou no sexto período do curso de Sistemas de Informação.</p> 
  <p>Sou um desenvolvedor fullstack, atualmente fazendo estágio na DTI Digital.</p>
  <p>Esta página foi feita para concluir o exercício inicial de php.</p>
  <?php
    for ($x = 0; $x <= 9; $x++) {
      echo "<p>Pra mostrar que o PHP está funcionando, printarei essa mensagem 10 vezes usando um for do PHP! Index: $x</p>";
    }
  ?>
</body>
</html>