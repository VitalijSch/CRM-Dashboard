import { Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    DashboardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private authenticationService: AuthenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.authenticationService.checkIfUserIsLogged();
  }
}
