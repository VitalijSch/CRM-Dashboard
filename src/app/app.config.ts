import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { FirebaseApp, initializeApp } from "firebase/app";
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const firebaseConfig = environment.firebaseConfig;

const app: FirebaseApp = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => app),
    provideFirestore(() => getFirestore()),
  ]
};
