import { Component, inject } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
import { FirestoreDatabaseService } from '../../../services/firestore-database/firestore-database.service';

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [
    CustomerComponent
  ],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.scss'
})
export class CustomerOverviewComponent {
  public firestoreDatabaseService: FirestoreDatabaseService = inject(FirestoreDatabaseService);
}
