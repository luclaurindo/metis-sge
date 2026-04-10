<?php
// database.php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function getConnection()
{
    $servername = "npab0961";
    $username = "db_pgn";
    $password = "!@#DBpgn";
    $database = "bd_scaps";
    $port = 3306;

    $conn = new mysqli($servername, $username, $password, $database, $port);

    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    }

    return $conn;
}
