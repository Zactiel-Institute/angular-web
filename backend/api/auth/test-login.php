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

// Datos de prueba hardcodeados
$testEmail = "juan@example.com";
$testPassword = "123456";

$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    http_response_code(500);
    echo json_encode(array(
        "error" => "No se pudo conectar a la base de datos",
        "details" => "Verifica que MySQL esté corriendo y que la base de datos servicios_db exista"
    ));
    exit();
}

$query = "SELECT id, nombre, email, password, rol, telefono, direccion, foto_perfil 
          FROM usuarios WHERE email = :email AND activo = 1";

$stmt = $db->prepare($query);
$stmt->bindParam(":email", $testEmail);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(array(
        "test" => "success",
        "message" => "Usuario encontrado en la base de datos",
        "email" => $testEmail,
        "password_hash" => substr($row['password'], 0, 20) . "...",
        "password_verify" => password_verify($testPassword, $row['password']) ? "CORRECTO" : "INCORRECTO",
        "user_data" => array(
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "email" => $row['email'],
            "rol" => $row['rol']
        )
    ));
} else {
    http_response_code(404);
    echo json_encode(array(
        "test" => "failed",
        "message" => "Usuario no encontrado en la base de datos",
        "email_buscado" => $testEmail,
        "sugerencia" => "Verifica que la base de datos servicios_db tenga datos"
    ));
}
?>
