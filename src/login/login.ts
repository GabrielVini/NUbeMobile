import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  remember = false;
  showPassword = false;
  submitted = false;
  loading = false;
  apiError = '';
  successMessage = '';

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly http: HttpClient, private readonly cdr: ChangeDetectorRef) {
    if (this.route.snapshot.queryParamMap.get('cadastro') === 'sucesso') this.successMessage = 'Conta criada com sucesso. Você já pode entrar.';
  }

  enter(): void {
    this.submitted = true;
    this.apiError = '';
    if (!this.email.trim() || !this.password) return;
    this.loading = true;
    this.http.post<{ nome: string }>('/api/auth/login', {
      email: this.email.trim(), senha: this.password
    }, { withCredentials: true }).pipe(
      timeout(10000),
      finalize(() => { this.loading = false; this.cdr.detectChanges(); })
    ).subscribe({
      next: () => { void this.router.navigate(['/contrato']); },
      error: (error: unknown) => {
        const status = error instanceof HttpErrorResponse ? error.status : 0;
        this.apiError = status === 401
          ? 'E-mail, matrícula ou senha inválidos.'
          : status === 0
            ? 'O servidor não respondeu. Verifique se o backend está iniciado.'
            : 'Não foi possível entrar agora. Tente novamente.';
      }
    });
  }
}
