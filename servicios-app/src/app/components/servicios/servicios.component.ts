// ============================================
// IMPORTACIONES
// ============================================
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ServiciosService, Servicio, Categoria } from '../../services/servicios.service';
import { AuthService } from '../../services/auth.service';

/**
 * ============================================
 * COMPONENTE: SERVICIOS
 * ============================================
 * Descripción: Componente principal que muestra la lista de servicios disponibles
 * 
 * Funcionalidades:
 * - Visualización de servicios en formato de tarjetas (cards)
 * - Filtrado por categorías (Limpieza, Plomería, etc.)
 * - Búsqueda de servicios por texto
 * - Contratación de servicios (solo para clientes)
 * - Navegación a "Mis Servicios" (solo para proveedores)
 * 
 * Roles permitidos: Cliente y Proveedor (ambos pueden ver servicios)
 */
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  animations: [
    // Animación para las tarjetas de servicios al aparecer
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Animación para el modal de contratación
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ServiciosComponent implements OnInit {
  // ============================================
  // PROPIEDADES DEL COMPONENTE
  // ============================================
  
  /** Lista completa de servicios obtenidos del backend */
  servicios: Servicio[] = [];
  
  /** Lista de categorías disponibles para filtrar */
  categorias: Categoria[] = [];
  
  /** Lista de servicios filtrados que se muestran en pantalla */
  filteredServicios: Servicio[] = [];
  
  /** ID de la categoría seleccionada para filtrar (null = todas) */
  selectedCategoria: number | null = null;
  
  /** Término de búsqueda ingresado por el usuario */
  searchTerm = '';
  
  /** Indica si los servicios están cargando */
  loading = true;
  
  /** Controla la visibilidad del modal de contratación */
  showContratarModal = false;
  
  /** Servicio seleccionado para contratar */
  selectedServicio: Servicio | null = null;
  
  /** Fecha mínima para el campo de fecha (no usado actualmente) */
  minDate: string = '';

  /** Datos del formulario de contratación */
  contratacionData = {
    fecha_servicio: '',  // Fecha en que se requiere el servicio
    mensaje: ''          // Mensaje opcional para el proveedor
  };

  // ============================================
  // CONSTRUCTOR
  // ============================================
  /**
   * Constructor del componente
   * @param serviciosService - Servicio para operaciones CRUD de servicios
   * @param authService - Servicio de autenticación (público para usar en el template)
   * @param router - Router de Angular para navegación
   * @param cdr - ChangeDetectorRef para forzar detección de cambios
   */
  constructor(
    private serviciosService: ServiciosService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // ============================================
  // CICLO DE VIDA
  // ============================================
  /**
   * Método que se ejecuta al inicializar el componente
   * - Verifica que el usuario esté autenticado
   * - Carga las categorías disponibles
   * - Carga los servicios
   */
  ngOnInit(): void {
    // Verificar autenticación
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }

    // Cargar datos iniciales
    this.loadCategorias();
    this.loadServicios();
  }

  // ============================================
  // MÉTODOS DE CARGA DE DATOS
  // ============================================
  
  /**
   * Carga las categorías desde el backend
   * Las categorías se usan para los filtros
   */
  loadCategorias(): void {
    this.serviciosService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  /**
   * Carga los servicios desde el backend
   * Aplica filtros si están seleccionados (categoría o búsqueda)
   * Usa ChangeDetectorRef para forzar la actualización de la vista
   */
  loadServicios(): void {
    this.loading = true;
    console.log('Cargando servicios...');
    console.log('Estado loading ANTES:', this.loading);
    
    this.serviciosService.getServicios(
      this.selectedCategoria || undefined,
      undefined,
      this.searchTerm || undefined
    ).subscribe({
      next: (data) => {
        console.log('Servicios recibidos:', data);
        console.log('Cantidad de servicios:', data.length);
        
        // Actualizar las listas de servicios
        this.servicios = data;
        this.filteredServicios = data;
        this.loading = false;
        
        // Forzar detección de cambios (necesario por SSR)
        this.cdr.detectChanges();
        
        console.log('Estado loading DESPUÉS:', this.loading);
        console.log('filteredServicios:', this.filteredServicios);
        console.log('ChangeDetection ejecutada');
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
        console.error('Detalles del error:', error.message);
        alert('Error al cargar servicios: ' + (error.message || 'Error desconocido'));
        this.loading = false;
      }
    });
  }

  // ============================================
  // MÉTODOS DE FILTRADO Y BÚSQUEDA
  // ============================================
  
  /**
   * Filtra los servicios por categoría
   * @param categoriaId - ID de la categoría seleccionada (null para mostrar todas)
   */
  filterByCategoria(categoriaId: number | null): void {
    this.selectedCategoria = categoriaId;
    this.loadServicios();
  }

  /**
   * Ejecuta la búsqueda de servicios
   * Se activa al presionar Enter o hacer clic en el botón Buscar
   */
  onSearch(): void {
    this.loadServicios();
  }

  // ============================================
  // MÉTODOS DEL MODAL DE CONTRATACIÓN
  // ============================================
  
  /**
   * Abre el modal para contratar un servicio
   * Solo disponible para usuarios con rol "cliente"
   * @param servicio - Servicio que se desea contratar
   */
  openContratarModal(servicio: Servicio): void {
    // Verificar que el usuario sea cliente
    if (!this.authService.isCliente()) {
      alert('Solo los clientes pueden contratar servicios');
      return;
    }
    
    // Configurar el modal
    this.selectedServicio = servicio;
    this.showContratarModal = true;
    this.contratacionData = {
      fecha_servicio: '',
      mensaje: ''
    };
  }

  /**
   * Cierra el modal de contratación
   * Limpia los datos del formulario
   */
  closeContratarModal(): void {
    this.showContratarModal = false;
    this.selectedServicio = null;
  }

  /**
   * Procesa la contratación del servicio
   * Envía los datos al backend y muestra mensaje de confirmación
   */
  contratarServicio(): void {
    // Validar que se hayan completado los campos requeridos
    if (!this.selectedServicio || !this.contratacionData.fecha_servicio) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Obtener el usuario actual
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    // Preparar los datos de la contratación
    const contratacion = {
      servicio_id: this.selectedServicio.id,
      cliente_id: currentUser.id,
      proveedor_id: this.selectedServicio.proveedor?.id,
      fecha_servicio: this.contratacionData.fecha_servicio,
      mensaje: this.contratacionData.mensaje,
      precio_acordado: this.selectedServicio.precio
    };

    // Enviar la contratación al backend
    this.serviciosService.contratarServicio(contratacion).subscribe({
      next: (response) => {
        alert('¡Servicio contratado exitosamente! El proveedor se pondrá en contacto contigo.');
        this.closeContratarModal();
      },
      error: (error) => {
        console.error('Error al contratar servicio:', error);
        alert('Error al contratar el servicio. Por favor intenta de nuevo.');
      }
    });
  }

  // ============================================
  // MÉTODOS DE NAVEGACIÓN
  // ============================================
  
  /**
   * Cierra la sesión del usuario y redirige al login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  /**
   * Navega a la página "Mis Servicios"
   * Solo disponible para proveedores
   */
  goToMisServicios(): void {
    this.router.navigate(['/mis-servicios']);
  }

  // ============================================
  // MÉTODOS AUXILIARES
  // ============================================
  
  /**
   * Genera un array de iconos de estrellas para mostrar la valoración
   * @param rating - Puntuación del servicio (0-5)
   * @returns Array de strings con los nombres de los iconos de Material Icons
   * 
   * Ejemplo: rating = 3.5 → ['star', 'star', 'star', 'star_half', 'star_border']
   */
  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);  // Estrellas completas
    const hasHalfStar = rating % 1 >= 0.5; // ¿Tiene media estrella?

    // Agregar estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    // Agregar media estrella si aplica
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    // Completar con estrellas vacías hasta 5
    while (stars.length < 5) {
      stars.push('star_border');
    }
    
    return stars;
  }

  /**
   * Obtiene la imagen por defecto según la categoría del servicio
   * Si el servicio no tiene imagen, se usa una imagen de Unsplash relacionada
   * @param categoriaNombre - Nombre de la categoría del servicio
   * @returns URL de la imagen por defecto
   */
  getDefaultImage(categoriaNombre: string): string {
    // Mapeo de categorías a imágenes de Unsplash
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
    
    // Retornar la imagen de la categoría o un placeholder genérico
    return imagenesCategoria[categoriaNombre] || 'https://via.placeholder.com/400x250?text=Servicio';
  }
}
