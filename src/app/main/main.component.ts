import { Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user/user.service';
import { FirestoreDatabaseService } from '../services/firestore-database/firestore-database.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    DashboardComponent,
    UserComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private firestoreDatabaseService: FirestoreDatabaseService = inject(FirestoreDatabaseService);
  public userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.authenticationService.checkIfUserIsLogged();
  }
}
