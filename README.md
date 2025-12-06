# Sistema de Contratación de Servicios

Una aplicación web completa desarrollada con Angular y PHP para la contratación de servicios entre proveedores y clientes.

## 🚀 Características

- **Autenticación de usuarios** con roles (Cliente/Proveedor)
- **Gestión de servicios** por parte de proveedores
- **Búsqueda y filtrado** de servicios por categoría
- **Sistema de contratación** para clientes
- **Valoraciones y reseñas** de servicios
- **Interfaz moderna** con animaciones y diseño responsive
- **Base de datos MySQL** con phpMyAdmin

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- XAMPP (Apache + MySQL + PHP)
- Angular CLI
- Navegador web moderno

## 🔧 Instalación

### 1. Configurar la Base de Datos

1. Inicia XAMPP y asegúrate de que Apache y MySQL estén corriendo
2. Abre phpMyAdmin en tu navegador: `http://localhost/phpmyadmin`
3. Importa el archivo de base de datos:
   - Ve a la pestaña "SQL"
   - Copia y pega el contenido de `backend/database/schema.sql`
   - Haz clic en "Continuar"

### 2. Configurar el Backend PHP

El backend ya está configurado en la carpeta `backend/`. Asegúrate de que XAMPP esté corriendo.

**Configuración de la base de datos** (si es necesario):
- Archivo: `backend/config/database.php`
- Host: `localhost`
- Usuario: `root`
- Contraseña: (vacío por defecto)
- Base de datos: `servicios_db`

### 3. Instalar y Ejecutar el Frontend Angular

```bash
# Navegar a la carpeta del proyecto Angular
cd servicios-app

# Instalar dependencias (si no se instalaron automáticamente)
npm install

# Iniciar el servidor de desarrollo
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

## 👥 Usuarios de Prueba

La base de datos incluye usuarios de ejemplo (contraseña: `123456`):

**Proveedores:**
- Email: `juan@example.com`
- Email: `carlos@example.com`

**Clientes:**
- Email: `maria@example.com`
- Email: `ana@example.com`

## 📱 Uso de la Aplicación

### Para Clientes:

1. **Registro/Login**: Crea una cuenta seleccionando el rol "Cliente"
2. **Explorar servicios**: Navega por los servicios disponibles
3. **Filtrar**: Usa las categorías o la barra de búsqueda
4. **Contratar**: Haz clic en "Contratar" en el servicio deseado
5. **Completar datos**: Selecciona fecha y agrega un mensaje opcional

### Para Proveedores:

1. **Registro/Login**: Crea una cuenta seleccionando el rol "Proveedor"
2. **Mis Servicios**: Accede a tu panel de servicios
3. **Crear servicio**: Haz clic en "Nuevo Servicio"
4. **Completar información**: 
   - Título del servicio
   - Categoría
   - Descripción detallada
   - Precio y tipo (hora/servicio/día)
   - Ubicación
   - Imagen (opcional)
5. **Publicar**: El servicio estará visible para todos los clientes

## 🎨 Características Técnicas

### Frontend (Angular)

- **Framework**: Angular 19
- **Estilos**: SCSS con diseño moderno
- **Animaciones**: Angular Animations
- **Componentes standalone**: Arquitectura moderna
- **Routing**: Navegación entre vistas
- **HTTP Client**: Comunicación con API REST
- **Reactive Forms**: Gestión de formularios

### Backend (PHP)

- **API REST**: Endpoints para todas las operaciones
- **PDO**: Conexión segura a base de datos
- **CORS**: Configurado para desarrollo local
- **Seguridad**: Passwords hasheados con bcrypt
- **Validación**: Validación de datos en servidor

### Base de Datos (MySQL)

- **Tablas principales**:
  - `usuarios`: Información de clientes y proveedores
  - `servicios`: Servicios ofrecidos
  - `categorias`: Categorías de servicios
  - `contrataciones`: Solicitudes de servicio
  - `valoraciones`: Reseñas y calificaciones

## 🎯 Categorías de Servicios

- 🧹 Limpieza
- 🔧 Plomería
- ⚡ Electricidad
- 🌿 Jardinería
- 🪚 Carpintería
- 🎨 Pintura
- 💻 Tecnología
- 📚 Educación
- 🚚 Transporte
- 💇 Belleza

## 📂 Estructura del Proyecto

```
Angular/
├── backend/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.php
│   │   │   └── register.php
│   │   ├── servicios/
│   │   │   ├── read.php
│   │   │   └── create.php
│   │   ├── categorias/
│   │   │   └── read.php
│   │   └── contrataciones/
│   │       └── create.php
│   ├── config/
│   │   └── database.php
│   └── database/
│       └── schema.sql
└── servicios-app/
    └── src/
        └── app/
            ├── components/
            │   ├── auth/
            │   ├── servicios/
            │   └── mis-servicios/
            └── services/
                ├── auth.service.ts
                └── servicios.service.ts
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Validación de datos en cliente y servidor
- Protección contra SQL injection con PDO
- CORS configurado apropiadamente
- Sesiones de usuario con localStorage

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/register.php` - Registro de usuario
- `POST /api/auth/login.php` - Inicio de sesión

### Servicios
- `GET /api/servicios/read.php` - Listar servicios
- `POST /api/servicios/create.php` - Crear servicio

### Categorías
- `GET /api/categorias/read.php` - Listar categorías

### Contrataciones
- `POST /api/contrataciones/create.php` - Contratar servicio

## 🎨 Diseño y UX

- **Colores principales**: Gradiente púrpura (#667eea - #764ba2)
- **Tipografía**: Poppins
- **Iconos**: Material Icons
- **Responsive**: Adaptado para móviles y tablets
- **Animaciones**: Transiciones suaves y efectos hover
- **Cards**: Diseño moderno con sombras y efectos

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que MySQL esté corriendo en XAMPP
- Comprueba las credenciales en `backend/config/database.php`

### Error CORS
- Asegúrate de que el backend esté en la carpeta correcta de XAMPP
- Verifica que Apache esté corriendo

### Servicios no se cargan
- Abre la consola del navegador (F12) para ver errores
- Verifica que la URL del API sea correcta en los servicios de Angular

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Desarrollo

Para contribuir o modificar el proyecto:

1. Clona el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Prueba exhaustivamente
5. Crea un pull request

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.

---

**¡Disfruta usando la aplicación de Servicios!** 🎉
