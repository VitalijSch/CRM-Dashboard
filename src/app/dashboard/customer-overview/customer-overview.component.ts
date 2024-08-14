import { Component, inject } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
import { FirebaseService } from '../../services/firebase/firebase.service';

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
  public firebaseService: FirebaseService = inject(FirebaseService);
}
