import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public authenticationService: AuthenticationService = inject(AuthenticationService);
  public userService: UserService = inject(UserService);
}
