<?php
// backend/api/pgn.php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once("../config/database.php");

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];


// ==========================
// GET (LISTAR)
// ==========================
if ($method === 'GET') {

    $sql = "SELECT * FROM tbl_pgn ORDER BY id DESC";
    $result = $conn->query($sql);

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
    exit;
}


// ==========================
// POST (CRIAR)
// ==========================
if ($method === 'POST') {

    $input = json_decode(file_get_contents("php://input"), true);

    $titulo = isset($input['titulo']) ? $input['titulo'] : '';
    $descricao = isset($input['descricao']) ? $input['descricao'] : '';
    $responsavel = isset($input['responsavel']) ? $input['responsavel'] : '';
    $prazo = isset($input['prazo']) ? $input['prazo'] : null;
    $status = isset($input['status']) ? $input['status'] : 'Pendente';

    if ($titulo == '') {
        echo json_encode([
            "status" => "error",
            "msg" => "Título é obrigatório"
        ]);
        exit;
    }

    $sql = "INSERT INTO tbl_pgn (titulo, descricao, responsavel, prazo, status)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $titulo, $descricao, $responsavel, $prazo, $status);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "msg" => "PGN criado com sucesso",
            "id" => $conn->insert_id
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "msg" => $stmt->error
        ]);
    }

    $stmt->close();
    exit;
}


// ==========================
// PUT (ATUALIZAR)
// ==========================
if ($method === 'PUT') {

    $input = json_decode(file_get_contents("php://input"), true);

    $id = isset($input['id']) ? intval($input['id']) : 0;

    if ($id <= 0) {
        echo json_encode([
            "status" => "error",
            "msg" => "ID inválido"
        ]);
        exit;
    }

    $titulo = isset($input['titulo']) ? $input['titulo'] : '';
    $descricao = isset($input['descricao']) ? $input['descricao'] : '';
    $responsavel = isset($input['responsavel']) ? $input['responsavel'] : '';
    $prazo = isset($input['prazo']) ? $input['prazo'] : null;
    $status = isset($input['status']) ? $input['status'] : 'Pendente';

    $sql = "UPDATE tbl_pgn 
            SET titulo=?, descricao=?, responsavel=?, prazo=?, status=?
            WHERE id=?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $titulo, $descricao, $responsavel, $prazo, $status, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "msg" => "PGN atualizado com sucesso"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "msg" => $stmt->error
        ]);
    }

    $stmt->close();
    exit;
}


// ==========================
// DELETE (EXCLUIR)
// ==========================
if ($method === 'DELETE') {

    $input = json_decode(file_get_contents("php://input"), true);

    $id = isset($input['id']) ? intval($input['id']) : 0;

    if ($id <= 0) {
        echo json_encode([
            "status" => "error",
            "msg" => "ID inválido"
        ]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM tbl_pgn WHERE id=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "msg" => "PGN excluído com sucesso"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "msg" => $stmt->error
        ]);
    }

    $stmt->close();
    exit;
}


$conn->close();
