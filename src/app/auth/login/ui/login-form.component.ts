import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Credentials } from '../../../shared/interfaces/credentials';

@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Input() loginStatus: 'idle' | 'authenticating' | 'error' = 'idle';
  @Output() login = new EventEmitter<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  submitForm() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    if (email && password) {
      this.login.emit({ email, password });
    } else {
      console.error('Email or password is missing.');
    }
  }
}