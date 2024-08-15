import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  public userForm!: FormGroup;
  public errorMessage!: string;

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
    // await this.authService.login(this.userForm.get('email')?.value, this.userForm.get('password')?.value)
    //   .then((result) => {
    //     const user = result.user.uid;
    //     this.router.navigate([`main-page/${user}`]);
    //   }).catch((error) => {
    //     if (error.code === 'auth/user-not-found') {
    //       this.errorMessage = 'user-not-found';
    //     } else if (error.code === 'auth/wrong-password') {
    //       this.errorMessage = 'wrong-password';
    //     } else if (error.code === 'auth/too-many-requests') {
    //       this.errorMessage = 'too-many-requests';
    //     }
    //   });
  }

  public loginAsGuest(): void {
    this.router.navigate(['main/guest']);
  }
}
