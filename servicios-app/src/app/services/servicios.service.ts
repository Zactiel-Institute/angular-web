import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo_precio: 'hora' | 'servicio' | 'dia';
  ubicacion: string;
  imagen?: string;
  proveedor?: {
    id: number;
    nombre: string;
    telefono: string;
  };
  categoria: {
    id: number;
    nombre: string;
    icono: string;
  };
  valoracion?: {
    promedio: number;
    total: number;
  };
  fecha_creacion?: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost/Frameworks/Angular/backend/api';

  constructor(private http: HttpClient) { }

  getServicios(categoriaId?: number, proveedorId?: number, search?: string): Observable<Servicio[]> {
    let url = `${this.apiUrl}/servicios/read.php`;
    const params: string[] = [];
    
    if (categoriaId) params.push(`categoria_id=${categoriaId}`);
    if (proveedorId) params.push(`proveedor_id=${proveedorId}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<Servicio[]>(url);
  }

  createServicio(servicio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/servicios/create.php`, servicio);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/read.php`);
  }

  contratarServicio(contratacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contrataciones/create.php`, contratacion);
  }
}
