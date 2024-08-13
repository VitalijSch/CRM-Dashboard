import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { FirebaseApp, initializeApp } from "firebase/app";
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwXZBP-EZOLdM-XXwn9mBqS4Ah0YPmzS8",
  authDomain: "crm-dashboard-ef9e3.firebaseapp.com",
  projectId: "crm-dashboard-ef9e3",
  storageBucket: "crm-dashboard-ef9e3.appspot.com",
  messagingSenderId: "758013761543",
  appId: "1:758013761543:web:b6123155ac408f83a272a2"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => app),
    provideFirestore(() => getFirestore()),
  ]
};
