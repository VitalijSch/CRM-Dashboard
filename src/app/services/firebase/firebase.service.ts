import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const dataRef = collection(this.firestore, 'data');
      const querySnapshot = await getDocs(dataRef);
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
}
