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

if (!empty($data->servicio_id) && !empty($data->cliente_id) && !empty($data->proveedor_id)) {
    
    $query = "INSERT INTO contrataciones (servicio_id, cliente_id, proveedor_id, fecha_servicio, mensaje, precio_acordado) 
              VALUES (:servicio_id, :cliente_id, :proveedor_id, :fecha_servicio, :mensaje, :precio_acordado)";
    
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(":servicio_id", $data->servicio_id);
    $stmt->bindParam(":cliente_id", $data->cliente_id);
    $stmt->bindParam(":proveedor_id", $data->proveedor_id);
    $stmt->bindParam(":fecha_servicio", $data->fecha_servicio);
    $stmt->bindParam(":mensaje", $data->mensaje);
    $stmt->bindParam(":precio_acordado", $data->precio_acordado);
    
    if ($stmt->execute()) {
        $contratacion_id = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode(array(
            "message" => "Contratación solicitada exitosamente",
            "id" => $contratacion_id
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo crear la contratación"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Datos incompletos"));
}
?>
