<?php
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nombre) && !empty($data->email) && !empty($data->password) && !empty($data->rol)) {
    
    // Verificar si el email ya existe
    $query = "SELECT id FROM usuarios WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "El email ya está registrado"));
        exit();
    }
    
    // Insertar nuevo usuario
    $query = "INSERT INTO usuarios (nombre, email, password, rol, telefono, direccion) 
              VALUES (:nombre, :email, :password, :rol, :telefono, :direccion)";
    
    $stmt = $db->prepare($query);
    
    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", $password_hash);
    $stmt->bindParam(":rol", $data->rol);
    $stmt->bindParam(":telefono", $data->telefono);
    $stmt->bindParam(":direccion", $data->direccion);
    
    if ($stmt->execute()) {
        $user_id = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode(array(
            "message" => "Usuario registrado exitosamente",
            "user" => array(
                "id" => $user_id,
                "nombre" => $data->nombre,
                "email" => $data->email,
                "rol" => $data->rol
            )
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo registrar el usuario"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Datos incompletos"));
}
?>
