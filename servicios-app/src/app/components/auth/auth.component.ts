import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AuthComponent {
  isLogin = true;
  loading = false;
  errorMessage = '';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'cliente',
    telefono: '',
    direccion: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/servicios']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        }
      });
  }

  onRegister(): void {
    if (!this.registerData.nombre || !this.registerData.email || 
        !this.registerData.password || !this.registerData.confirmPassword) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { confirmPassword, ...userData } = this.registerData;

    this.authService.register(userData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          alert('Registro exitoso. Por favor inicie sesión.');
          this.isLogin = true;
          this.loginData.email = this.registerData.email;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al registrarse';
        }
      });
  }
}
