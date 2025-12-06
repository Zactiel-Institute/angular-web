-- Crear base de datos
CREATE DATABASE IF NOT EXISTS servicios_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE servicios_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'proveedor') NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    foto_perfil VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de categorías de servicios
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    categoria_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    tipo_precio ENUM('hora', 'servicio', 'dia') DEFAULT 'servicio',
    ubicacion VARCHAR(200),
    imagen VARCHAR(255),
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE,
    INDEX idx_proveedor (proveedor_id),
    INDEX idx_categoria (categoria_id),
    INDEX idx_disponible (disponible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de valoraciones
CREATE TABLE IF NOT EXISTS valoraciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    servicio_id INT NOT NULL,
    cliente_id INT NOT NULL,
    puntuacion INT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_servicio (servicio_id),
    INDEX idx_cliente (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de contrataciones
CREATE TABLE IF NOT EXISTS contrataciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    servicio_id INT NOT NULL,
    cliente_id INT NOT NULL,
    proveedor_id INT NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_servicio DATE,
    estado ENUM('pendiente', 'aceptada', 'rechazada', 'completada', 'cancelada') DEFAULT 'pendiente',
    mensaje TEXT,
    precio_acordado DECIMAL(10, 2),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (proveedor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_servicio (servicio_id),
    INDEX idx_cliente (cliente_id),
    INDEX idx_proveedor (proveedor_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar categorías por defecto
INSERT INTO categorias (nombre, descripcion, icono) VALUES
('Limpieza', 'Servicios de limpieza del hogar y oficinas', 'cleaning_services'),
('Plomería', 'Reparación e instalación de sistemas de agua', 'plumbing'),
('Electricidad', 'Instalaciones y reparaciones eléctricas', 'electrical_services'),
('Jardinería', 'Mantenimiento de jardines y áreas verdes', 'yard'),
('Carpintería', 'Trabajos en madera y muebles', 'carpenter'),
('Pintura', 'Servicios de pintura interior y exterior', 'format_paint'),
('Tecnología', 'Soporte técnico y reparación de equipos', 'computer'),
('Educación', 'Clases particulares y tutorías', 'school'),
('Transporte', 'Servicios de mudanza y transporte', 'local_shipping'),
('Belleza', 'Servicios de estética y cuidado personal', 'face');

-- Insertar usuarios de ejemplo (password: 123456)
INSERT INTO usuarios (nombre, email, password, rol, telefono) VALUES
('Juan Pérez', 'juan@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'proveedor', '555-0101'),
('María García', 'maria@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cliente', '555-0102'),
('Carlos López', 'carlos@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'proveedor', '555-0103'),
('Ana Martínez', 'ana@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cliente', '555-0104');

-- Insertar servicios de ejemplo
INSERT INTO servicios (proveedor_id, categoria_id, titulo, descripcion, precio, tipo_precio, ubicacion) VALUES
(1, 1, 'Limpieza profunda de hogar', 'Servicio completo de limpieza incluyendo todas las habitaciones, cocina y baños', 50.00, 'servicio', 'Ciudad de México'),
(1, 2, 'Reparación de fugas', 'Detección y reparación de fugas de agua en tuberías', 35.00, 'hora', 'Ciudad de México'),
(3, 3, 'Instalación eléctrica', 'Instalación de contactos, apagadores y luminarias', 40.00, 'hora', 'Guadalajara'),
(3, 4, 'Mantenimiento de jardín', 'Poda, riego y mantenimiento general de jardines', 30.00, 'servicio', 'Guadalajara');
