import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Customer } from '../../interfaces/customer';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  public customers!: Customer[];
  private customerSubscription!: Subscription;

  private page: number = 1;
  public numberOfPages: number[] = [this.page];

  private obj: Customer = {
    customerName: 'string',
    company: 'string',
    phoneNumber: 123456789,
    email: 'string',
    country: 'string',
    status: false
  }

  constructor() {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    const dataRef = collection(this.firestore, 'customers');
    const customers$: Observable<Customer[]> = collectionData(dataRef, { idField: 'id' }) as Observable<Customer[]>;
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
    this.customerSubscription = customers$.subscribe(data => {
      this.customers = data;
    });
  }

  public async addCustomer() {
    await addDoc(collection(this.firestore, 'customers'), this.obj);
    console.log(this.customers.length % 9)
    if (this.customers.length % 9 === 0) {
      this.page++;
    }
    if (!this.numberOfPages.includes(this.page)) {
      this.numberOfPages.push(this.page);
    }
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
}
