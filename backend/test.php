<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode(array(
    "status" => "success",
    "message" => "Backend PHP funcionando correctamente",
    "timestamp" => date('Y-m-d H:i:s')
));
?>
