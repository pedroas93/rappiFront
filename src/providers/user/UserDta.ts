import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { UserAdmin } from 'entities/user';
import { HttpClient } from '@angular/common/http';
import { nodeServer } from 'environments/environment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserDta {
  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient, private afs: AngularFirestore) {}

  public loginWithMail(email: string, password: string): Promise<any> {
    console.log('ENtro al dta no entiendo porque no entra al create');
    return new Promise((resolve, reject) => {
      const info: any = {uId: null, token: null };
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((data: any) => {
        console.log('en el then la data es -->', data.uid, '---', data.qa);
        info.uId = data.uid;
        info.token = data.qa;
        resolve(info);
      })
      .catch(error => reject({error , status: false}));
    });
  }

  public signOutUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signOut().then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
    });
  }

  public createUserAdmin(user: UserAdmin): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        const url = `${nodeServer}/user/Admin`;
        const subscriptionService: Subscription = this.http.post(url, user)
        .subscribe((data: any) => {
          subscriptionService.unsubscribe();
          resolve(data);
        }, (error) => {
          subscriptionService.unsubscribe();
          reject(error);
        });
      });
  }

  public getUsers(role: string): Observable<any> {
    const fieldPath = `roles.${role}`;
    return this.afs
    .collection('users', ref => ref.where(fieldPath, '==', true).where('status', '==', 1))
    .snapshotChanges()
    .pipe(
      map((changes: any) => {
        return changes.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ... data};
        });
      })
    );
  }

  public removeUser(iduser: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${nodeServer}/user/Admin/${iduser}`;
      const subscriptionService: Subscription = this.http.delete(url)
      .subscribe((data: any) => {
        subscriptionService.unsubscribe();
        resolve(data);
      }, (error) => {
        subscriptionService.unsubscribe();
        reject(error);
      });
    });
  }

  public updateUser(userAdmin: UserAdmin): Promise<any> {
    return new Promise((resolve, reject) => {
      const dataUser = {...userAdmin};
      const url = `${nodeServer}/user/Admin`;
      const subscriptionService: Subscription = this.http.patch(url, dataUser)
      .subscribe((data: any) => {
        subscriptionService.unsubscribe();
        resolve(data);
      }, (error) => {
        subscriptionService.unsubscribe();
        reject(error);
      });
    });
  }

  public rememberPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.sendPasswordResetEmail(email)
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
}
