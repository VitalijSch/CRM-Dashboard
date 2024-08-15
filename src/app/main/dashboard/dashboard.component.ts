import { Component } from '@angular/core';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { CustomerOverviewComponent } from './customer-overview/customer-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UserOverviewComponent,
    CustomerOverviewComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
