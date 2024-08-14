import { Component, Input } from '@angular/core';
import { Customer } from '../../../interfaces/customer';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  @Input() customer!: Customer;
}
