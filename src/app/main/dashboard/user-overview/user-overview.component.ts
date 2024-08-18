import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent {
  public authenticationService: AuthenticationService = inject(AuthenticationService);
}
