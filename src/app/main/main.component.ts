import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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

}
