<?php

namespace App\Repository;

use App\Database\Connection;
use App\Models\Estado;

class EstadoRepository implements Repository {

  private $connection;

  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  public function getAll() {
    $this->connection->getAdapter()->open();

    $sql = "SELECT * FROM estados";
    $estados = $this->connection->getAdapter()->get()->query($sql);
    $estadosModel = [];
    while($est = $estados->fetch()) {
      array_push($estadosModel, new Estado($est['id'], $est['nome'], $est['sigla']));
    }
    $this->connection->getAdapter()->close();
    return $estadosModel;
  }

}