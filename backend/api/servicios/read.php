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

$categoria_id = isset($_GET['categoria_id']) ? $_GET['categoria_id'] : null;
$proveedor_id = isset($_GET['proveedor_id']) ? $_GET['proveedor_id'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;

$query = "SELECT s.*, u.nombre as proveedor_nombre, u.telefono as proveedor_telefono, 
          c.nombre as categoria_nombre, c.icono as categoria_icono,
          COALESCE(AVG(v.puntuacion), 0) as promedio_valoracion,
          COUNT(DISTINCT v.id) as total_valoraciones
          FROM servicios s
          INNER JOIN usuarios u ON s.proveedor_id = u.id
          INNER JOIN categorias c ON s.categoria_id = c.id
          LEFT JOIN valoraciones v ON s.id = v.servicio_id
          WHERE s.disponible = 1";

if ($categoria_id) {
    $query .= " AND s.categoria_id = :categoria_id";
}

if ($proveedor_id) {
    $query .= " AND s.proveedor_id = :proveedor_id";
}

if ($search) {
    $query .= " AND (s.titulo LIKE :search OR s.descripcion LIKE :search)";
}

$query .= " GROUP BY s.id ORDER BY s.fecha_creacion DESC";

$stmt = $db->prepare($query);

if ($categoria_id) {
    $stmt->bindParam(":categoria_id", $categoria_id);
}

if ($proveedor_id) {
    $stmt->bindParam(":proveedor_id", $proveedor_id);
}

if ($search) {
    $search_param = "%{$search}%";
    $stmt->bindParam(":search", $search_param);
}

$stmt->execute();

$servicios = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $servicio = array(
        "id" => $row['id'],
        "titulo" => $row['titulo'],
        "descripcion" => $row['descripcion'],
        "precio" => $row['precio'],
        "tipo_precio" => $row['tipo_precio'],
        "ubicacion" => $row['ubicacion'],
        "imagen" => $row['imagen'],
        "proveedor" => array(
            "id" => $row['proveedor_id'],
            "nombre" => $row['proveedor_nombre'],
            "telefono" => $row['proveedor_telefono']
        ),
        "categoria" => array(
            "id" => $row['categoria_id'],
            "nombre" => $row['categoria_nombre'],
            "icono" => $row['categoria_icono']
        ),
        "valoracion" => array(
            "promedio" => round($row['promedio_valoracion'], 1),
            "total" => $row['total_valoraciones']
        ),
        "fecha_creacion" => $row['fecha_creacion']
    );
    array_push($servicios, $servicio);
}

http_response_code(200);
echo json_encode($servicios);
?>
