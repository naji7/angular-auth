import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  defaultAuth: any = {
    email: 'admin@mail.com',
    password: '12345',
  };
  hasError: boolean = false;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  isLoading: boolean = false;

  login() {
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        // this.matSnackBar.open(response.message, 'Close', {
        //   duration: 5000,
        //   horizontalPosition: 'center',
        // });
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (error) => {
        this.hasError = true;
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn() ? this.router.navigate(['/']) : null;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
