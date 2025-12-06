<?php
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM categorias WHERE activo = 1 ORDER BY nombre";
$stmt = $db->prepare($query);
$stmt->execute();

$categorias = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    array_push($categorias, $row);
}

http_response_code(200);
echo json_encode($categorias);
?>
