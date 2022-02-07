import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../user";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable, of, switchMap} from "rxjs";
import {Position} from "../../position";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUser: Observable<User | null | undefined>;
  users: Observable<User[]>;
  uid: string = "";

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );

    // @ts-ignore
    this.users = this.db.collection("users").valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUid(): string {
    return this.uid;
  }

  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['list']);
      })
      .catch(error => window.alert(error.message));
  }

  createUser(email: string, password: string, username: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.updateUserData(result.user, username);
        this.router.navigate(['list']);
      })
      .catch(error => window.alert(error.message));
  }

  logOut(): void {
    this.afAuth.signOut()
      .then(result => {
        console.log(result);
        this.router.navigate(['list']);
      })
      .catch(error => window.alert(error.message));
  }

  updateUserData(user: any, username: any, admin: boolean = false, manager: boolean = false, banned: boolean = false, cart: Position[] = []) {
    let userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    let data: User = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      roles: {
        manager: manager,
        admin: admin,
        banned: banned
      },
      cart: cart,
      history: []
    }

    return userRef.set(data, {merge: true});
  }
}
