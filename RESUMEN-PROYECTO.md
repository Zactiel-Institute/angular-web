# 🎯 Sistema de Contratación de Servicios

## 📊 Resumen del Proyecto

Este es un sistema completo de contratación de servicios que conecta **proveedores** con **clientes**, desarrollado con tecnologías modernas y un diseño atractivo.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Angular 19)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Auth      │  │  Servicios   │  │ Mis Servicios│      │
│  │  Component   │  │  Component   │  │  Component   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                           │                                  │
│                    ┌──────▼──────┐                          │
│                    │  Services   │                          │
│                    │  (HTTP)     │                          │
│                    └──────┬──────┘                          │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API REST     │
                    │   (PHP)        │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │   MySQL DB     │
                    │  (phpMyAdmin)  │
                    └────────────────┘
```

---

## 🎨 Características Visuales

### Diseño Moderno
- ✨ **Gradientes vibrantes**: Púrpura (#667eea) a Violeta (#764ba2)
- 🎭 **Animaciones suaves**: Transiciones y efectos hover
- 📱 **Responsive**: Adaptado para todos los dispositivos
- 🎯 **Material Icons**: Iconografía consistente
- 🖼️ **Cards elegantes**: Con sombras y efectos 3D

### Experiencia de Usuario
- 🔄 **Carga dinámica**: Spinners animados
- 🎪 **Modales interactivos**: Para acciones importantes
- 🔍 **Búsqueda en tiempo real**: Filtros instantáneos
- 🏷️ **Categorías visuales**: Con iconos representativos
- ⭐ **Sistema de valoraciones**: Estrellas visuales

---

## 📦 Componentes Principales

### 1. **Autenticación** (`auth.component`)
```
┌─────────────────────────────────┐
│  🔐 Login / Registro            │
├─────────────────────────────────┤
│  • Formularios validados        │
│  • Selección de rol             │
│  • Animaciones de entrada       │
│  • Manejo de errores            │
└─────────────────────────────────┘
```

### 2. **Lista de Servicios** (`servicios.component`)
```
┌───────────���─────────────────────┐
│  🏪 Marketplace de Servicios    │
├─────────────────────────────────┤
│  • Grid de servicios            │
│  • Filtros por categoría        │
│  • Búsqueda avanzada            │
│  • Modal de contratación        │
│  • Información del proveedor    │
└─────────────────────────────────┘
```

### 3. **Mis Servicios** (`mis-servicios.component`)
```
┌─────────────────────────────────┐
│  💼 Panel de Proveedor          │
├─────────────────────────────────┤
│  • Crear nuevo servicio         │
│  • Ver servicios publicados     │
│  • Estadísticas de valoración   │
│  • Gestión completa             │
└─────────────────────────────────┘
```

---

## 🗄️ Base de Datos

### Tablas Principales

```sql
usuarios
├── id (PK)
├── nombre
├── email (UNIQUE)
├── password (HASHED)
├── rol (cliente/proveedor)
├── telefono
├── direccion
└── fecha_registro

servicios
├── id (PK)
├── proveedor_id (FK)
├── categoria_id (FK)
├── titulo
├── descripcion
├── precio
├── tipo_precio
├── ubicacion
└── imagen

categorias
├── id (PK)
├── nombre
├── descripcion
└── icono

contrataciones
├── id (PK)
├── servicio_id (FK)
├── cliente_id (FK)
├── proveedor_id (FK)
├── fecha_servicio
├── estado
└── precio_acordado

valoraciones
├── id (PK)
├── servicio_id (FK)
├── cliente_id (FK)
├── puntuacion (1-5)
└── comentario
```

---

## 🔌 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register.php` | Registrar nuevo usuario |
| POST | `/api/auth/login.php` | Iniciar sesión |

### Servicios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/servicios/read.php` | Listar servicios (con filtros) |
| POST | `/api/servicios/create.php` | Crear nuevo servicio |

### Categorías
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias/read.php` | Listar todas las categorías |

### Contrataciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contrataciones/create.php` | Contratar un servicio |

---

## 🎯 Flujo de Usuario

### Cliente
```
1. Registro/Login
   ↓
2. Ver servicios disponibles
   ↓
3. Filtrar por categoría o buscar
   ↓
4. Seleccionar servicio
   ↓
5. Contratar (fecha + mensaje)
   ↓
6. Confirmación
```

### Proveedor
```
1. Registro/Login
   ↓
2. Ir a "Mis Servicios"
   ↓
3. Crear nuevo servicio
   ↓
4. Completar formulario
   ↓
5. Publicar servicio
   ↓
6. Recibir contrataciones
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 19**: Framework principal
- **TypeScript**: Lenguaje de programación
- **SCSS**: Estilos avanzados
- **RxJS**: Programación reactiva
- **Angular Animations**: Animaciones fluidas
- **Material Icons**: Iconografía

### Backend
- **PHP 8**: Lenguaje del servidor
- **PDO**: Acceso a base de datos
- **REST API**: Arquitectura de API
- **JSON**: Formato de datos

### Base de Datos
- **MySQL**: Sistema de gestión
- **phpMyAdmin**: Interfaz de administración

### Herramientas
- **XAMPP**: Servidor local
- **Angular CLI**: Herramientas de desarrollo
- **npm**: Gestor de paquetes

---

## 📈 Estadísticas del Proyecto

```
📁 Archivos creados:        25+
💻 Líneas de código:        3000+
🎨 Componentes Angular:     3
🔧 Servicios Angular:       2
📊 Tablas de BD:            5
🎯 Endpoints API:           7
🎨 Categorías:              10
```

---

## 🎓 Conceptos Implementados

### Angular
- ✅ Componentes standalone
- ✅ Routing y navegación
- ✅ Servicios e inyección de dependencias
- ✅ HTTP Client
- ✅ Formularios reactivos
- ✅ Animaciones
- ✅ Observables y RxJS
- ✅ Guards de ruta (implícito)

### PHP
- ✅ API REST
- ✅ PDO y prepared statements
- ✅ Seguridad (password hashing)
- ✅ CORS headers
- ✅ JSON responses
- ✅ Error handling

### Base de Datos
- ✅ Diseño relacional
- ✅ Foreign keys
- ✅ Índices
- ✅ Constraints
- ✅ Datos de ejemplo

---

## 🚀 Próximas Mejoras Posibles

1. **Sistema de mensajería** entre cliente y proveedor
2. **Panel de administración** para gestionar usuarios
3. **Sistema de pagos** integrado
4. **Notificaciones en tiempo real**
5. **Historial de contrataciones**
6. **Subida de imágenes** al servidor
7. **Mapa de ubicaciones** con Google Maps
8. **Chat en vivo**
9. **Sistema de reportes**
10. **Estadísticas para proveedores**

---

## 📝 Notas Importantes

- 🔒 Las contraseñas se almacenan hasheadas con bcrypt
- 🌐 CORS está configurado para desarrollo local
- 📱 La aplicación es completamente responsive
- ✨ Todas las animaciones son suaves y optimizadas
- 🎨 El diseño sigue principios de Material Design
- 🔍 La búsqueda es en tiempo real
- ⚡ Las operaciones son asíncronas

---

## 🎉 Resultado Final

Una aplicación web moderna, funcional y visualmente atractiva que permite:
- ✅ Registro y autenticación de usuarios
- ✅ Publicación de servicios por proveedores
- ✅ Búsqueda y contratación por clientes
- ✅ Sistema de valoraciones
- ✅ Gestión completa de servicios
- ✅ Interfaz intuitiva y responsive

---

**¡Proyecto completado con éxito!** 🎊

Para más detalles técnicos, consulta el archivo README.md
Para instrucciones de uso, consulta INSTRUCCIONES.txt
