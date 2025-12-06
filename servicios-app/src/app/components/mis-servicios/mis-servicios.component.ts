import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService, Servicio, Categoria } from '../../services/servicios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-servicios.component.html',
  styleUrls: ['./mis-servicios.component.scss']
})
export class MisServiciosComponent implements OnInit {
  misServicios: Servicio[] = [];
  categorias: Categoria[] = [];
  showModal = false;
  loading = true;

  nuevoServicio = {
    proveedor_id: 0,
    categoria_id: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    tipo_precio: 'servicio',
    ubicacion: '',
    imagen: ''
  };

  constructor(
    private serviciosService: ServiciosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser || !this.authService.isProveedor()) {
      alert('Solo los proveedores pueden acceder a esta sección');
      this.router.navigate(['/servicios']);
      return;
    }

    this.nuevoServicio.proveedor_id = currentUser.id;
    this.loadCategorias();
    this.loadMisServicios();
  }

  loadCategorias(): void {
    this.serviciosService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        if (data.length > 0) {
          this.nuevoServicio.categoria_id = data[0].id;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  loadMisServicios(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.loading = true;
    this.serviciosService.getServicios(undefined, currentUser.id).subscribe({
      next: (data) => {
        this.misServicios = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
        this.loading = false;
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
  }

  resetForm(): void {
    const currentUser = this.authService.getCurrentUser();
    this.nuevoServicio = {
      proveedor_id: currentUser?.id || 0,
      categoria_id: this.categorias.length > 0 ? this.categorias[0].id : 0,
      titulo: '',
      descripcion: '',
      precio: 0,
      tipo_precio: 'servicio',
      ubicacion: '',
      imagen: ''
    };
  }

  crearServicio(): void {
    if (!this.nuevoServicio.titulo || !this.nuevoServicio.descripcion || 
        !this.nuevoServicio.precio || !this.nuevoServicio.ubicacion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (this.nuevoServicio.precio <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    this.serviciosService.createServicio(this.nuevoServicio).subscribe({
      next: (response) => {
        alert('¡Servicio creado exitosamente!');
        this.closeModal();
        this.loadMisServicios();
      },
      error: (error) => {
        console.error('Error al crear servicio:', error);
        alert('Error al crear el servicio. Por favor intenta de nuevo.');
      }
    });
  }

  volverAServicios(): void {
    this.router.navigate(['/servicios']);
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (hasHalfStar) {
      stars.push('star_half');
    }
    while (stars.length < 5) {
      stars.push('star_border');
    }
    return stars;
  }
}
