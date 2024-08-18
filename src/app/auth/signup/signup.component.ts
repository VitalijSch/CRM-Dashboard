import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('fileInput') public fileInput: any;

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  public storageService: StorageService = inject(StorageService);
  public authenticationService: AuthenticationService = inject(AuthenticationService);

  public showCheckboxFeedback: boolean = false;
  public userForm!: FormGroup;

  ngOnInit() {
    this.setupUserProfileForm();
  }

  private setupUserProfileForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]+\s[A-Z][a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{8,}$/)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  public addUser(): void {
    this.checkCheckbox();
    if (this.userForm.valid) {
      this.authenticationService.registerWithEmailPassword(this.userForm.get('name')?.value, this.userForm.get('email')?.value, this.userForm.get('password')?.value, this.storageService.avatar);
    }
  }

  private checkCheckbox(): void {
    const acceptTermsControl = this.userForm.get('acceptTerms');
    if (acceptTermsControl && !acceptTermsControl.value) {
      this.showCheckboxFeedback = true;
      setTimeout(() => {
        this.showCheckboxFeedback = false;
      }, 2000);
    }
  }

  public onUploadButtonClick(): void {
    this.fileInput.nativeElement.click();
  }
}
