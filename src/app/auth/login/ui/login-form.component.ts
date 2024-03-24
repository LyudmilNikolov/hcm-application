import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginStatus } from '../../../shared/enums/login-status.enum';
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
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() loginStatus: LoginStatus = LoginStatus.IDLE;
  @Output() login = new EventEmitter<Credentials>();

  public LoginStatus = LoginStatus;
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitForm(): void {    
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.getRawValue());
    }
  }
}