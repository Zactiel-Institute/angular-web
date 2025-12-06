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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    
    $query = "SELECT id, nombre, email, password, rol, telefono, direccion, foto_perfil 
              FROM usuarios WHERE email = :email AND activo = 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login exitoso",
                "user" => array(
                    "id" => $row['id'],
                    "nombre" => $row['nombre'],
                    "email" => $row['email'],
                    "rol" => $row['rol'],
                    "telefono" => $row['telefono'],
                    "direccion" => $row['direccion'],
                    "foto_perfil" => $row['foto_perfil']
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Contraseña incorrecta"));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Usuario no encontrado"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Datos incompletos"));
}
?>
