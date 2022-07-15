import { Injectable } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createNewUser(email: string, password: string) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password).then(
        () => {
          resolve(true);
        },
        (err) => reject(err)
      );
    });
  }

  signInUser(email: string, password: string) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password).then(
        () => {
          resolve(true);
        },
        (err) => reject(err)
      );
    });
  }

  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((err) => console.log(err));
  }
}
