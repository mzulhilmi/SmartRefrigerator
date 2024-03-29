import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { MyUser } from '../models/myuser';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  public MyUsers: AngularFirestoreCollection<MyUser>;
  public MySettings: AngularFirestoreDocument<MyUser>;
  private myuser: MyUser;
  private userId: string;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService) {

    this.userId = this.auth.userDetails().uid;

    this.MyUsers = this.db.collection( 'users' );
    this.MySettings = this.MyUsers.doc<MyUser>(this.userId);
  }

  getSetting() {
    return this.MySettings.valueChanges();
  }

  saveSetting(myUser: MyUser) {
    return this.MySettings.set(myUser);
  }
}
