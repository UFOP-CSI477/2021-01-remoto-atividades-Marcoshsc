<?php

  echo "Dados recebidos por requisição POST:";
  $nome = $_POST['nome'];
  $address = $_POST['address'];
  $cpf = $_POST['cpf'];
  $phone = $_POST['phone'];
  $gender = $_POST['gender'];

  echo "<p>Nome: $nome</p>";
  echo "<p>Endereço: $address</p>";
  echo "<p>CPF: $cpf</p>";
  echo "<p>Telefone de contato: $phone</p>";
  echo "<p>Gênero: $gender</p>";