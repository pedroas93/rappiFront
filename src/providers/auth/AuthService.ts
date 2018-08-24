import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as Firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'entities/user/User';
import { ChangePasswordEntity } from 'entities/user/ChangePassword';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    public user$: Observable<User>;
    public token = '';

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                ) {
            this.user$ = this.afAuth.authState
            .pipe(
                switchMap(user => {
                    if (user) {
                        return  this.afs.doc(`users/${user.uid}`).valueChanges();
                    } else {
                        return of(null);
                    }
                })
            );
    }

    public canRead(user: User, expectedRoles: string[]) {
        let allowAcces: Boolean = false;
        for (const role of expectedRoles) {
            if (user.roles[role]) {
                allowAcces = true;
                break;
            }
        }
        return allowAcces;
    }

    public getAuthorizationToken(): any {
        this.afAuth.authState.forEach((token: any) => {
            if (token !== null) {
                this.token = token.qa;
            }
        });
        return this.token;
    }

    public validateDataUserLogin(dataUser: any): Observable<any> {
        const query = this.afs.collection(`users`, ref => ref.where('email', '==',
        dataUser.email).where('status', '==', 1));
        const items = query.snapshotChanges();
        return items;
    }

    public changePasswordUser(dataPassword: ChangePasswordEntity): Promise<any> {
        return new Promise((resolve, reject) => {

            const user = this.afAuth.auth.currentUser;
            user.reauthenticateWithCredential(
                Firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    dataPassword.currentPassword
                )
            )
            .then(() => {
                user.updatePassword(dataPassword.newPassword).then(() => {
                    resolve({status: true});
                }).catch(function(error) {
                    reject({status: null});
                });
            })
            .catch((error) => {
                reject({status: false});
            });
        });
    }
}
