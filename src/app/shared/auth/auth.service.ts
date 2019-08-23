import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";

import { Facebook } from "@ionic-native/facebook/ngx";

import { BehaviorSubject } from "rxjs";
import * as firebase from 'firebase/app';
import "@firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private zone: NgZone, private facebook: Facebook) { }


  init(): void {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAnbBUyXaTFWoDC9zMVYsmyJmwWjV-KTuA",
      authDomain: "ionic4authfacebooklogin.firebaseapp.com",
      databaseURL: "https://ionic4authfacebooklogin.firebaseio.com",
      projectId: "ionic4authfacebooklogin",
      storageBucket: "",
      messagingSenderId: "29895027339",
      appId: "1:29895027339:web:8b4d5912cdea9a3f"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  login(): void {
    this.browserFacebookAuth();
  }

  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async logout(): Promise<void> {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  }

}
