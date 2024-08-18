import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  public authenticationService: AuthenticationService = inject(AuthenticationService);

  public userForm!: FormGroup;

  ngOnInit(): void {
    this.setupEmailAndPasswordForm();
  }

  private setupEmailAndPasswordForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]]
    });
  }

  public async login(): Promise<void> {
    this.authenticationService.loginAsUser(this.userForm.get('email')?.value, this.userForm.get('password')?.value);
  }
}
