<?php

    require_once 'connection.php';

    $produtos = $connection->query("SELECT * FROM produtos");

    require 'view.php';