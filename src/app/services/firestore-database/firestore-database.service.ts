import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Customer } from '../../interfaces/customer';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
  private firestore: Firestore = inject(Firestore);

  public customers!: Customer[];
  private customerSubscription!: Subscription;

  public numberOfPages: number[] = [];

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
    this.loadNumberOfPages();
  }

  ngOnInit(): void {
    this.checkNumberOfPages();
  }

  private loadCustomers(): void {
    const dataRef = collection(this.firestore, 'customers');
    const customers$: Observable<Customer[]> = collectionData(dataRef, { idField: 'id' }) as Observable<Customer[]>;
    this.customerSubscription = customers$.subscribe(data => {
      this.customers = data;
    });
  }

  public async addCustomer() {
    await addDoc(collection(this.firestore, 'customers'), this.obj);
    this.checkNumberOfPages();
  }

  private async loadNumberOfPages(): Promise<void> {
    const dataRef = collection(this.firestore, 'numberOfPages');
    const pages$: Observable<number[]> = collectionData(dataRef, { idField: 'id' }) as unknown as Observable<number[]>;
    this.customerSubscription = pages$.subscribe(async data => {
      this.numberOfPages = data;
      if (this.numberOfPages.length === 0) {
        await this.checkNumberOfPages();
      }
      console.log(this.numberOfPages);
    });
  }

  private async checkNumberOfPages(): Promise<void> {
    if (this.customers.length % 9 === 0) {
      await this.addPageNumber();
    }
    if (!this.numberOfPages.includes(this.numberOfPages.length)) {
      this.numberOfPages.push(this.numberOfPages.length);
    }
  }

  private async addPageNumber() {
    await addDoc(collection(this.firestore, 'numberOfPages'), { page: this.numberOfPages.length });
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
}