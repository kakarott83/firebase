import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../model/user';

/* https://www.positronx.io/full-angular-7-firebase-authentication-system/ */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public fireStore: AngularFirestore,
    public fireStoreAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.fireStoreAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        }
    });
  }

  signIn(email, password) {
    return this.fireStoreAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    console.log(email, password);
    return this.fireStoreAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  sendVerificationMail() {
    return this.fireStoreAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  forgotPassword(passwordResetEmail) {
    return this.fireStoreAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerfified !== false) ? true : false;
  }

  SetUserData(user) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.fireStoreAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
  }
}
