import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth: Auth = getAuth();

  private router: Router = inject(Router);

  public user: User = {
    name: '',
    email: '',
    avatar: ''
  };

  public loginAsGuest(): void {
    signInAnonymously(this.auth)
      .then(() => {
        this.router.navigate(['main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  public loginAsUser(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.router.navigate(['main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in: ", errorCode, errorMessage);
      });
  }

  public logout() {
    signOut(this.auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }

  public async registerWithEmailPassword(name: string, email: string, password: string, avatarUrl: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl
      });
      console.log("User created: ", user);
      this.router.navigate(['auth/login']);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating user: ", (error as any).code, error.message);
      } else {
        console.error("Unknown error: ", error);
      }
    }
  }

  public checkIfUserIsLogged(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loggedAsGuest(user);
        this.loggedAsUser(user);
        console.log('user is logged:', this.user);
      } else {
        this.router.navigate(['auth/login']);
      }
    });

  }

  private loggedAsGuest(user: any): void {
    if (user.email === null) {
      this.user.name = 'Guest';
      this.user.email = 'guest@mail.com';
      this.user.avatar = './assets/images/profile.png';
    }
  }

  private loggedAsUser(user: any): void {
    if (user.email !== null) {
      this.user.name = user.displayName;
      this.user.email = user.email;
      this.user.avatar = user.photoURL;
    }
  }
}
