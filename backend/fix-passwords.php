<?php
header("Content-Type: text/html; charset=UTF-8");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    die("Error: No se pudo conectar a la base de datos");
}

// Generar el hash correcto para la contraseña "123456"
$password = "123456";
$hash = password_hash($password, PASSWORD_BCRYPT);

echo "<h2>Actualizando contraseñas...</h2>";
echo "<p>Hash generado: <code>" . $hash . "</code></p>";
echo "<hr>";

// Actualizar todos los usuarios con la nueva contraseña
$query = "UPDATE usuarios SET password = :password";
$stmt = $db->prepare($query);
$stmt->bindParam(":password", $hash);

if ($stmt->execute()) {
    echo "<p style='color: green; font-weight: bold;'>✓ Contraseñas actualizadas exitosamente!</p>";
    
    // Verificar los usuarios
    $query = "SELECT id, nombre, email, rol FROM usuarios";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    echo "<h3>Usuarios actualizados:</h3>";
    echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
    echo "<tr style='background: #667eea; color: white;'>";
    echo "<th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Password</th>";
    echo "</tr>";
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['nombre'] . "</td>";
        echo "<td>" . $row['email'] . "</td>";
        echo "<td>" . $row['rol'] . "</td>";
        echo "<td>123456</td>";
        echo "</tr>";
    }
    
    echo "</table>";
    
    echo "<hr>";
    echo "<h3>Prueba ahora:</h3>";
    echo "<ul>";
    echo "<li><strong>Email:</strong> juan@example.com</li>";
    echo "<li><strong>Password:</strong> 123456</li>";
    echo "</ul>";
    
    echo "<p><a href='api/auth/test-login.php' style='background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Probar Login</a></p>";
    
} else {
    echo "<p style='color: red; font-weight: bold;'>✗ Error al actualizar contraseñas</p>";
    print_r($stmt->errorInfo());
}
?>
