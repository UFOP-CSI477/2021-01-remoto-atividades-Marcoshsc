<?php

    $dbfile = "database.sqlite";

    $strConnection = "sqlite:" . $dbfile;

    $connection = new PDO($strConnection);