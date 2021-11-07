<?php

require '../vendor/autoload.php';

use App\Models\Estado;
use App\Database\Connection;
use App\Database\AdapterSQLite;
use App\Repository\EstadoRepository;
use App\Repository\ProdutoRepository;

$connection = new Connection(new AdapterSQLite());

$estadoRepository = new EstadoRepository($connection);
$produtoRepository = new ProdutoRepository($connection);

$estados = $estadoRepository->getAll();
$produtos = $produtoRepository->getAll();

require './view.php';