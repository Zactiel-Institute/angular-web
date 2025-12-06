# 📚 Documentación del Código - Sistema de Servicios

## 📋 Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Frontend - Angular](#frontend---angular)
3. [Backend - PHP](#backend---php)
4. [Base de Datos](#base-de-datos)
5. [Flujo de Datos](#flujo-de-datos)
6. [Guía de Modificación](#guía-de-modificación)

---

## 🏗️ Estructura del Proyecto

```
Angular/
├── backend/                    # Backend PHP
│   ├── api/                   # Endpoints de la API REST
│   │   ├── auth/             # Autenticación
│   │   │   ├── login.php     # Inicio de sesión
│   │   │   └── register.php  # Registro de usuarios
│   │   ├── servicios/        # Gestión de servicios
│   │   │   ├── read.php      # Listar servicios
│   │   │   └── create.php    # Crear servicio
│   │   ├── categorias/       # Categorías
│   │   │   └── read.php      # Listar categorías
│   │   └── contrataciones/   # Contrataciones
│   │       └── create.php    # Crear contratación
│   ���── config/               # Configuración
│   │   └── database.php      # Conexión a BD
│   └── database/             # Scripts SQL
│       └── schema.sql        # Estructura de BD
│
└── servicios-app/            # Frontend Angular
    └── src/
        └── app/
            ├── components/   # Componentes de la UI
            │   ├── auth/    # Login/Registro
            │   ├── servicios/        # Lista de servicios
            │   └── mis-servicios/    # Panel de proveedor
            └── services/    # Servicios de Angular
                ├── auth.service.ts       # Autenticación
                └── servicios.service.ts  # CRUD servicios
```

---

## 🎨 Frontend - Angular

### **Componentes Principales**

#### **1. AuthComponent** (`auth.component.ts`)
**Ubicación:** `src/app/components/auth/`

**Propósito:** Maneja el login y registro de usuarios

**Propiedades clave:**
```typescript
isLogin: boolean          // true = login, false = registro
loading: boolean          // Indica si está procesando
errorMessage: string      // Mensaje de error a mostrar
loginData: object         // Datos del formulario de login
registerData: object      // Datos del formulario de registro
```

**Métodos principales:**
- `toggleMode()` - Cambia entre login y registro
- `onLogin()` - Procesa el inicio de sesión
- `onRegister()` - Procesa el registro de usuario

**Flujo:**
1. Usuario ingresa credenciales
2. Se validan los datos
3. Se envía petición al backend
4. Si es exitoso, guarda usuario en localStorage
5. Redirige a `/servicios`

---

#### **2. ServiciosComponent** (`servicios.component.ts`)
**Ubicación:** `src/app/components/servicios/`

**Propósito:** Muestra la lista de servicios disponibles

**Propiedades clave:**
```typescript
servicios: Servicio[]           // Lista completa de servicios
filteredServicios: Servicio[]   // Servicios filtrados
categorias: Categoria[]         // Categorías disponibles
selectedCategoria: number       // Categoría seleccionada
searchTerm: string              // Término de búsqueda
loading: boolean                // Estado de carga
showContratarModal: boolean     // Visibilidad del modal
```

**Métodos principales:**
- `loadServicios()` - Carga servicios del backend
- `loadCategorias()` - Carga categorías
- `filterByCategoria(id)` - Filtra por categoría
- `onSearch()` - Ejecuta búsqueda
- `openContratarModal(servicio)` - Abre modal de contratación
- `contratarServicio()` - Procesa la contratación
- `getStars(rating)` - Genera estrellas de valoración
- `getDefaultImage(categoria)` - Obtiene imagen por defecto

**Flujo de carga:**
1. `ngOnInit()` verifica autenticación
2. Carga categorías y servicios
3. Usa `ChangeDetectorRef` para forzar actualización
4. Muestra servicios en tarjetas (cards)

---

#### **3. MisServiciosComponent** (`mis-servicios.component.ts`)
**Ubicación:** `src/app/components/mis-servicios/`

**Propósito:** Panel para que proveedores gestionen sus servicios

**Propiedades clave:**
```typescript
misServicios: Servicio[]    // Servicios del proveedor
categorias: Categoria[]     // Categorías disponibles
showModal: boolean          // Visibilidad del modal
nuevoServicio: object       // Datos del nuevo servicio
```

**Métodos principales:**
- `loadMisServicios()` - Carga servicios del proveedor
- `openModal()` - Abre modal para crear servicio
- `crearServicio()` - Crea nuevo servicio
- `resetForm()` - Limpia el formulario

**Flujo de creación:**
1. Proveedor hace clic en "Nuevo Servicio"
2. Completa formulario en modal
3. Se validan los datos
4. Se envía al backend
5. Se actualiza la lista de servicios

---

### **Servicios de Angular**

#### **1. AuthService** (`auth.service.ts`)
**Ubicación:** `src/app/services/`

**Propósito:** Gestiona la autenticación y sesión del usuario

**Propiedades:**
```typescript
private apiUrl: string                    // URL del backend
private currentUserSubject: BehaviorSubject<User>  // Usuario actual
public currentUser$: Observable<User>     // Observable del usuario
private isBrowser: boolean                // Detecta si está en navegador
```

**Métodos:**
- `register(userData)` - Registra nuevo usuario
- `login(email, password)` - Inicia sesión
- `logout()` - Cierra sesión
- `getCurrentUser()` - Obtiene usuario actual
- `isLoggedIn()` - Verifica si hay sesión activa
- `isProveedor()` - Verifica si es proveedor
- `isCliente()` - Verifica si es cliente

**Importante:**
- Usa `localStorage` para persistir la sesión
- Usa `isPlatformBrowser` para evitar errores de SSR
- Emite cambios a través de `BehaviorSubject`

---

#### **2. ServiciosService** (`servicios.service.ts`)
**Ubicación:** `src/app/services/`

**Propósito:** Gestiona las operaciones CRUD de servicios

**Métodos:**
```typescript
getServicios(categoriaId?, proveedorId?, search?)  // Lista servicios
createServicio(servicio)                           // Crea servicio
getCategorias()                                    // Lista categorías
contratarServicio(contratacion)                    // Crea contratación
```

**Interfaces:**
```typescript
interface Servicio {
  id?: number
  titulo: string
  descripcion: string
  precio: number
  tipo_precio: 'hora' | 'servicio' | 'dia'
  ubicacion: string
  imagen?: string
  proveedor?: {...}
  categoria: {...}
  valoracion?: {...}
}

interface Categoria {
  id: number
  nombre: string
  descripcion: string
  icono: string
}
```

---

## 🔧 Backend - PHP

### **Estructura de Archivos PHP**

Todos los archivos PHP siguen esta estructura:
```php
<?php
// 1. Headers CORS (obligatorio)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// 2. Manejo de peticiones OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Incluir configuración de BD
include_once '../../config/database.php';

// 4. Lógica del endpoint
// ...

// 5. Respuesta JSON
echo json_encode($response);
?>
```

---

### **Endpoints Principales**

#### **1. Login** (`api/auth/login.php`)
**Método:** POST

**Entrada:**
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```

**Salida exitosa:**
```json
{
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "proveedor",
    "telefono": "555-0101"
  }
}
```

**Flujo:**
1. Recibe email y password
2. Busca usuario en BD
3. Verifica password con `password_verify()`
4. Retorna datos del usuario

---

#### **2. Registro** (`api/auth/register.php`)
**Método:** POST

**Entrada:**
```json
{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "123456",
  "rol": "cliente",
  "telefono": "555-1234"
}
```

**Flujo:**
1. Valida que el email no exista
2. Hashea la contraseña con `password_hash()`
3. Inserta usuario en BD
4. Retorna confirmación

---

#### **3. Listar Servicios** (`api/servicios/read.php`)
**Método:** GET

**Parámetros opcionales:**
- `categoria_id` - Filtrar por categoría
- `proveedor_id` - Filtrar por proveedor
- `search` - Buscar en título/descripción

**Salida:**
```json
[
  {
    "id": 1,
    "titulo": "Limpieza profunda de hogar",
    "descripcion": "Servicio completo...",
    "precio": "50.00",
    "tipo_precio": "servicio",
    "ubicacion": "Ciudad de México",
    "proveedor": {
      "id": 1,
      "nombre": "Juan Pérez",
      "telefono": "555-0101"
    },
    "categoria": {
      "id": 1,
      "nombre": "Limpieza",
      "icono": "cleaning_services"
    },
    "valoracion": {
      "promedio": 4.5,
      "total": 10
    }
  }
]
```

**Características:**
- Usa JOIN para obtener datos relacionados
- Calcula promedio de valoraciones
- Filtra servicios disponibles

---

#### **4. Crear Servicio** (`api/servicios/create.php`)
**Método:** POST

**Entrada:**
```json
{
  "proveedor_id": 1,
  "categoria_id": 1,
  "titulo": "Nuevo Servicio",
  "descripcion": "Descripción detallada",
  "precio": 100.00,
  "tipo_precio": "hora",
  "ubicacion": "Ciudad",
  "imagen": "https://..."
}
```

---

#### **5. Contratar Servicio** (`api/contrataciones/create.php`)
**Método:** POST

**Entrada:**
```json
{
  "servicio_id": 1,
  "cliente_id": 2,
  "proveedor_id": 1,
  "fecha_servicio": "2024-12-15",
  "mensaje": "Necesito el servicio...",
  "precio_acordado": 50.00
}
```

---

### **Configuración de Base de Datos** (`config/database.php`)

```php
class Database {
    private $host = "localhost";
    private $db_name = "servicios_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo json_encode(array("message" => "Error de conexión"));
        }
        return $this->conn;
    }
}
```

**Para modificar:**
- Cambiar `$host` si MySQL está en otro servidor
- Cambiar `$username` y `$password` según tu configuración
- Cambiar `$db_name` si usas otro nombre de BD

---

## 🗄️ Base de Datos

### **Tablas Principales**

#### **1. usuarios**
```sql
id              INT (PK, AUTO_INCREMENT)
nombre          VARCHAR(100)
email           VARCHAR(100) UNIQUE
password        VARCHAR(255)  -- Hasheado con bcrypt
rol             ENUM('cliente', 'proveedor')
telefono        VARCHAR(20)
direccion       TEXT
foto_perfil     VARCHAR(255)
fecha_registro  TIMESTAMP
activo          BOOLEAN
```

#### **2. servicios**
```sql
id                  INT (PK, AUTO_INCREMENT)
proveedor_id        INT (FK → usuarios.id)
categoria_id        INT (FK → categorias.id)
titulo              VARCHAR(200)
descripcion         TEXT
precio              DECIMAL(10, 2)
tipo_precio         ENUM('hora', 'servicio', 'dia')
ubicacion           VARCHAR(200)
imagen              VARCHAR(255)
disponible          BOOLEAN
fecha_creacion      TIMESTAMP
fecha_actualizacion TIMESTAMP
```

#### **3. categorias**
```sql
id           INT (PK, AUTO_INCREMENT)
nombre       VARCHAR(100)
descripcion  TEXT
icono        VARCHAR(50)  -- Nombre del icono de Material Icons
activo       BOOLEAN
```

#### **4. contrataciones**
```sql
id               INT (PK, AUTO_INCREMENT)
servicio_id      INT (FK → servicios.id)
cliente_id       INT (FK → usuarios.id)
proveedor_id     INT (FK → usuarios.id)
fecha_solicitud  TIMESTAMP
fecha_servicio   DATE
estado           ENUM('pendiente', 'aceptada', 'rechazada', 'completada', 'cancelada')
mensaje          TEXT
precio_acordado  DECIMAL(10, 2)
```

#### **5. valoraciones**
```sql
id           INT (PK, AUTO_INCREMENT)
servicio_id  INT (FK → servicios.id)
cliente_id   INT (FK → usuarios.id)
puntuacion   INT (1-5)
comentario   TEXT
fecha        TIMESTAMP
```

---

## 🔄 Flujo de Datos

### **Flujo de Login**
```
1. Usuario ingresa credenciales en AuthComponent
2. AuthComponent llama a AuthService.login()
3. AuthService hace petición HTTP a backend/api/auth/login.php
4. PHP verifica credenciales en BD
5. PHP retorna datos del usuario
6. AuthService guarda usuario en localStorage
7. AuthService emite usuario a través de BehaviorSubject
8. AuthComponent redirige a /servicios
```

### **Flujo de Visualización de Servicios**
```
1. ServiciosComponent se inicializa (ngOnInit)
2. Llama a ServiciosService.getServicios()
3. ServiciosService hace petición a backend/api/servicios/read.php
4. PHP consulta BD con JOINs
5. PHP retorna array de servicios en JSON
6. ServiciosComponent recibe datos
7. Actualiza filteredServicios[]
8. Llama a ChangeDetectorRef.detectChanges()
9. Angular renderiza las tarjetas en el HTML
```

### **Flujo de Contratación**
```
1. Cliente hace clic en "Contratar"
2. Se abre modal con formulario
3. Cliente completa fecha y mensaje
4. ServiciosComponent.contratarServicio()
5. ServiciosService.contratarServicio() hace POST
6. PHP inserta registro en tabla contrataciones
7. PHP retorna confirmación
8. Se muestra alert de éxito
9. Se cierra el modal
```

---

## 🛠️ Guía de Modificación

### **Agregar un nuevo campo a Servicio**

**1. Modificar la base de datos:**
```sql
ALTER TABLE servicios ADD COLUMN nuevo_campo VARCHAR(100);
```

**2. Actualizar la interfaz en Angular:**
```typescript
// servicios.service.ts
export interface Servicio {
  // ... campos existentes
  nuevo_campo?: string;  // Agregar aquí
}
```

**3. Actualizar el PHP:**
```php
// api/servicios/read.php
$servicio = array(
    // ... campos existentes
    "nuevo_campo" => $row['nuevo_campo']  // Agregar aquí
);
```

**4. Actualizar el HTML:**
```html
<!-- servicios.component.html -->
<p>{{ servicio.nuevo_campo }}</p>
```

---

### **Agregar una nueva categoría**

**Opción 1: Desde phpMyAdmin**
```sql
INSERT INTO categorias (nombre, descripcion, icono) 
VALUES ('Nueva Categoría', 'Descripción', 'icono_material');
```

**Opción 2: Desde la aplicación**
Crear un componente de administración que permita agregar categorías.

---

### **Cambiar colores del diseño**

**Archivo:** `servicios.component.scss`

```scss
// Cambiar el gradiente principal
.header {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}

// Cambiar color de botones
.btn-primary {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

---

### **Agregar validación personalizada**

**En el componente:**
```typescript
validarCampoPersonalizado(): boolean {
  if (this.miCampo.length < 10) {
    this.errorMessage = 'El campo debe tener al menos 10 caracteres';
    return false;
  }
  return true;
}
```

---

## 📝 Convenciones de Código

### **Nombres de Variables**
- **camelCase** para variables y métodos: `loadServicios()`, `selectedCategoria`
- **PascalCase** para clases e interfaces: `ServiciosComponent`, `Servicio`
- **UPPER_CASE** para constantes: `API_URL`, `MAX_ITEMS`

### **Comentarios**
```typescript
// Comentario de una línea

/**
 * Comentario de documentación
 * @param parametro - Descripción del parámetro
 * @returns Descripción del retorno
 */
```

### **Estructura de Métodos**
```typescript
nombreMetodo(): tipoRetorno {
  // 1. Validaciones
  if (!condicion) return;
  
  // 2. Lógica principal
  const resultado = operacion();
  
  // 3. Actualización de estado
  this.propiedad = resultado;
  
  // 4. Efectos secundarios
  this.cdr.detectChanges();
}
```

---

## 🐛 Debugging

### **Problemas Comunes**

**1. Servicios no se muestran**
- Verificar que `loading = false`
- Verificar que `filteredServicios.length > 0`
- Llamar a `this.cdr.detectChanges()`

**2. Error CORS**
- Verificar headers en archivos PHP
- Verificar que Apache esté corriendo

**3. Error 401 Unauthorized**
- Verificar que los headers CORS estén antes de cualquier lógica
- Verificar que la contraseña esté correctamente hasheada

**4. Imágenes no cargan**
- Verificar URL de la imagen
- Verificar función `getDefaultImage()`

---

## 📞 Recursos Adicionales

- **Angular Docs:** https://angular.dev
- **Material Icons:** https://fonts.google.com/icons
- **Unsplash (imágenes):** https://unsplash.com
- **PHP PDO:** https://www.php.net/manual/es/book.pdo.php

---

**¡Documentación completa!** 🎉

Para más detalles específicos, consulta los comentarios en cada archivo del código.
