import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @ViewChild('fileInput') public fileInput: any;

  private fb: FormBuilder = inject(FormBuilder);
  public userService: UserService = inject(UserService);
  public authenticationService: AuthenticationService = inject(AuthenticationService);
  public storageService: StorageService = inject(StorageService);

  public userForm!: FormGroup;
  private file!: File;

  ngOnInit(): void {
    this.setupEmailAndPasswordForm();
  }

  private setupEmailAndPasswordForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]+\s[A-Z][a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
    });
  }

  public handleShowUser(event: Event): void {
    event.stopPropagation();
    this.userService.toggleShowUser();
  }

  public onUploadButtonClick(): void {
    this.fileInput.nativeElement.click();
  }

  public logoutUser(): void {
    this.userService.toggleShowUser();
    this.authenticationService.logout();
  }
}
