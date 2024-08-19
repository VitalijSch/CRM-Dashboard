import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FirestoreDatabaseService } from '../../../services/firestore-database/firestore-database.service';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent {
  public firestoreDatabaseService: FirestoreDatabaseService = inject(FirestoreDatabaseService);
  public authenticationService: AuthenticationService = inject(AuthenticationService);
}
