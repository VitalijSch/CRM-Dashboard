import { effect, inject, Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, doc, DocumentData, onSnapshot, QuerySnapshot, updateDoc } from 'firebase/firestore';
import { Customer } from '../../interfaces/customer';
import { User } from '../../interfaces/user';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
  private firestore: Firestore = inject(Firestore);

  public customersSignal = signal<Customer[]>([]);
  public usersSignal = signal<User[]>([]);

  private customersUnsubscribe!: Unsubscribe;
  private usersUnsubscribe!: Unsubscribe;

  private obj: Customer = {
    customerName: 'string',
    company: 'string',
    phoneNumber: 123456789,
    email: 'string',
    country: 'string',
    status: false
  };

  constructor() {
    this.loadCustomers();
    this.loadCreatedUsers();
  }

  private customersCollection(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'customers');
  }

  private usersCollection(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'users');
  }

  private loadCustomers(): void {
    this.customersUnsubscribe = onSnapshot(this.customersCollection(), (querysnapshot: QuerySnapshot<DocumentData>) => {
      const customersArray: Customer[] = [];
      querysnapshot.forEach(doc => {
        customersArray.push(doc.data() as Customer);
      });
      this.customersSignal.set(customersArray);
    });
  }

  private loadCreatedUsers(): void {
    this.usersUnsubscribe = onSnapshot(this.usersCollection(), (querysnapshot: QuerySnapshot<DocumentData>) => {
      const usersArray: User[] = [];
      querysnapshot.forEach(doc => {
        usersArray.push(doc.data() as User);
      });
      this.usersSignal.set(usersArray);
    });
  }

  public async addCustomer(): Promise<void> {
    await addDoc(this.customersCollection(), this.obj);
  }

  public async addCreatedUsers(user: any): Promise<void> {
    await addDoc(this.usersCollection(), user);
  }

  public async updateUserStatus(userId: string, isOnline: boolean): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDocRef, { isOnline });
  }

  ngOnDestroy(): void {
    if (this.customersUnsubscribe) {
      this.customersUnsubscribe();
    }
    if (this.usersUnsubscribe) {
      this.usersUnsubscribe();
    }
  }
}