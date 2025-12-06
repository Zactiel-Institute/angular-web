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

if (!empty($data->proveedor_id) && !empty($data->categoria_id) && 
    !empty($data->titulo) && !empty($data->descripcion) && !empty($data->precio)) {
    
    $query = "INSERT INTO servicios (proveedor_id, categoria_id, titulo, descripcion, precio, tipo_precio, ubicacion, imagen) 
              VALUES (:proveedor_id, :categoria_id, :titulo, :descripcion, :precio, :tipo_precio, :ubicacion, :imagen)";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":proveedor_id", $data->proveedor_id);
    $stmt->bindParam(":categoria_id", $data->categoria_id);
    $stmt->bindParam(":titulo", $data->titulo);
    $stmt->bindParam(":descripcion", $data->descripcion);
    $stmt->bindParam(":precio", $data->precio);
    $stmt->bindParam(":tipo_precio", $data->tipo_precio);
    $stmt->bindParam(":ubicacion", $data->ubicacion);
    $stmt->bindParam(":imagen", $data->imagen);
    
    if ($stmt->execute()) {
        $servicio_id = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode(array(
            "message" => "Servicio creado exitosamente",
            "id" => $servicio_id
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo crear el servicio"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Datos incompletos"));
}
?>
