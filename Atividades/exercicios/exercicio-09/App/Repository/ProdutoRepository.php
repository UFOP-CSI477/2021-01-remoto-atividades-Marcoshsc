<?php

namespace App\Repository;

use App\Database\Connection;
use App\Models\Produto;

class ProdutoRepository implements Repository {

  private $connection;

  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  public function getAll() {
    $this->connection->getAdapter()->open();

    $sql = "SELECT * FROM produtos";
    $produtos = $this->connection->getAdapter()->get()->query($sql);
    $produtosModel = [];
    while($prod = $produtos->fetch()) {
      array_push($produtosModel, new Produto($prod['id'], $prod['nome'], $prod['um']));
    }
    $this->connection->getAdapter()->close();
    return $produtosModel;
  }

}