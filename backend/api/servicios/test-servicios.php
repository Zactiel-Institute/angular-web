<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    http_response_code(500);
    echo json_encode(array(
        "error" => "No se pudo conectar a la base de datos"
    ));
    exit();
}

// Probar consulta simple
$query = "SELECT COUNT(*) as total FROM servicios";
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode(array(
    "test" => "success",
    "message" => "Conexión exitosa",
    "total_servicios" => $result['total'],
    "database" => "servicios_db"
));
?>
