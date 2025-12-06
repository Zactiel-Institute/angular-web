# 📸 Guía de Imágenes - Sistema de Servicios

## 🎯 **Dónde se cargan las imágenes:**

### **1. Lista de Servicios**
**Archivo:** `servicios-app/src/app/components/servicios/servicios.component.html`
**Línea:** 69

```html
<img
  [src]="servicio.imagen || getDefaultImage(servicio.categoria.nombre)"
  [alt]="servicio.titulo"
/>
```

### **2. Mis Servicios (Proveedores)**
**Archivo:** `servicios-app/src/app/components/mis-servicios/mis-servicios.component.html`
**Línea:** 31

```html
<img
  [src]="servicio.imagen || 'https://via.placeholder.com/400x250?text=Servicio'"
  [alt]="servicio.titulo"
/>
```

---

## 🎨 **Cómo funcionan las imágenes:**

### **Prioridad:**
1. **Primera opción:** Usa `servicio.imagen` (URL de la base de datos)
2. **Segunda opción:** Si no hay imagen, usa la imagen por defecto

### **Función `getDefaultImage()`:**
Ahora cada categoría tiene su propia imagen por defecto de Unsplash:

```typescript
getDefaultImage(categoriaNombre: string): string {
  const imagenesCategoria: { [key: string]: string } = {
    'Limpieza': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
    'Plomería': 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=250&fit=crop',
    'Electricidad': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
    'Jardinería': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
    'Carpintería': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=250&fit=crop',
    'Pintura': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop',
    'Tecnología': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
    'Educación': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    'Transporte': 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=250&fit=crop',
    'Belleza': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop'
  };
  
  return imagenesCategoria[categoriaNombre] || 'https://via.placeholder.com/400x250?text=Servicio';
}
```

---

## 🔧 **Opciones para modificar:**

### **Opción 1: Cambiar todas las imágenes por defecto**

Edita la función `getDefaultImage()` en:
`servicios-app/src/app/components/servicios/servicios.component.ts`

```typescript
// Ejemplo: Usar imágenes locales
'Limpieza': 'assets/images/limpieza.jpg',
'Plomería': 'assets/images/plomeria.jpg',
// etc...
```

### **Opción 2: Usar una sola imagen para todos**

En el HTML, cambia:
```html
[src]="servicio.imagen || 'TU_URL_AQUI'"
```

### **Opción 3: Agregar imágenes a servicios existentes**

**A) Desde la base de datos:**
```sql
UPDATE servicios 
SET imagen = 'https://tu-url-de-imagen.jpg' 
WHERE id = 1;
```

**B) Al crear un nuevo servicio:**
En el formulario de "Crear Servicio", hay un campo "URL de imagen" donde puedes pegar la URL.

---

## 📦 **Usar imágenes locales:**

### **Paso 1: Crear carpeta de imágenes**
```
servicios-app/
  └── public/
      └── images/
          ├── limpieza.jpg
          ├── plomeria.jpg
          ├── electricidad.jpg
          └── ...
```

### **Paso 2: Actualizar el código**
```html
<img
  [src]="servicio.imagen || 'images/default.jpg'"
  [alt]="servicio.titulo"
/>
```

---

## 🌐 **Fuentes de imágenes gratuitas:**

### **Unsplash** (ya implementado)
- URL: https://unsplash.com
- Formato: `https://images.unsplash.com/photo-XXXXX?w=400&h=250&fit=crop`

### **Pexels**
- URL: https://www.pexels.com
- Ejemplo: `https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?w=400&h=250`

### **Pixabay**
- URL: https://pixabay.com
- Descarga y usa localmente

### **Placeholder.com** (actual fallback)
- URL: https://via.placeholder.com
- Formato: `https://via.placeholder.com/400x250?text=Tu+Texto`

---

## 🎨 **Tamaños recomendados:**

- **Ancho:** 400px
- **Alto:** 250px
- **Ratio:** 16:10
- **Formato:** JPG o PNG
- **Peso:** Máximo 200KB para mejor rendimiento

---

## 💡 **Tips:**

1. **Optimiza las imágenes** antes de subirlas
2. **Usa CDN** como Unsplash para mejor rendimiento
3. **Mantén consistencia** en tamaños y calidad
4. **Usa lazy loading** para mejorar la carga (ya implementado)
5. **Agrega alt text** descriptivo para accesibilidad

---

## 🔄 **Actualizar imágenes en servicios existentes:**

### **Método 1: Desde phpMyAdmin**
1. Abre http://localhost/phpmyadmin
2. Selecciona base de datos `servicios_db`
3. Tabla `servicios`
4. Edita el campo `imagen` del servicio
5. Pega la URL de la imagen

### **Método 2: Desde SQL**
```sql
-- Actualizar un servicio específico
UPDATE servicios 
SET imagen = 'https://images.unsplash.com/photo-XXXXX?w=400&h=250&fit=crop' 
WHERE id = 1;

-- Actualizar todos los servicios de una categoría
UPDATE servicios 
SET imagen = 'https://tu-imagen.jpg' 
WHERE categoria_id = 1;
```

### **Método 3: Al crear nuevo servicio**
En el formulario de "Crear Servicio", completa el campo "URL de imagen (opcional)"

---

## 📝 **Ejemplo completo:**

```typescript
// En servicios.component.ts
getDefaultImage(categoriaNombre: string): string {
  const imagenesCategoria: { [key: string]: string } = {
    'Limpieza': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
    'Plomería': 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=250&fit=crop',
    // ... más categorías
  };
  
  return imagenesCategoria[categoriaNombre] || 'https://via.placeholder.com/400x250?text=Servicio';
}
```

```html
<!-- En servicios.component.html -->
<img
  [src]="servicio.imagen || getDefaultImage(servicio.categoria.nombre)"
  [alt]="servicio.titulo"
/>
```

---

## ✅ **Cambios ya aplicados:**

1. ✅ Función `getDefaultImage()` creada
2. ✅ Imágenes de Unsplash para cada categoría
3. ✅ HTML actualizado para usar la función
4. ✅ Fallback a placeholder si no hay imagen

---

## 🚀 **Para ver los cambios:**

1. Recarga la página (F5)
2. Los servicios sin imagen ahora mostrarán imágenes relacionadas con su categoría
3. Las imágenes son de alta calidad de Unsplash

---

**¡Ahora cada categoría tiene su propia imagen por defecto!** 🎨
