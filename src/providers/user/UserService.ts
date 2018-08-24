import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserDta } from './UserDta';
import { UserAdmin } from 'entities/user';
import { Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  public messageErrorFirebase: any = {};

  constructor(
    private userDta: UserDta,
    private translate: TranslateService,
    public router: Router
  ) {
  }

  public loginWithMail(email: string, password: string): Promise<any> {
    console.log('loginwithmail en services');
    return new Promise((resolve, reject) => {
      this.userDta.loginWithMail(email, password)
        .then(info  => {
          if (info != null) {
            resolve('/users/home');
          }
        })
        .catch(error => {
          let message: string;
          if (!error.status) {
            const codeError = error.error.code;
            if (codeError === 'auth/wrong-password' || codeError === 'auth/invalid-email' || codeError === 'auth/user-not-found') {
              this.messageErrorFirebase.status = error.status;
              message = 'USER.WRONG_ACCESS_DATA';
            } else {
              this.messageErrorFirebase.status = error.status;
              message = 'USER.ERROR_SYSTEM';
            }
          } else {
            this.messageErrorFirebase.status = error.status;
            message = 'USER.ERROR_SYSTEM';
          }
          this.translate.get(message).subscribe((response: string) => {
            this.messageErrorFirebase.msg = response;
          });
          reject(this.messageErrorFirebase);
        });
    });
  }

  public createUserAdmin(user: UserAdmin): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        this.userDta.createUserAdmin(user)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  public getAllUsers(): Observable<any> {
    return combineLatest<any[]>(
      this.getUsers('professional'),
      this.getUsers('admin')
    )
    .pipe(
      map((arr) => arr.reduce((acc, cur) => acc.concat(cur)) ),
      map((users) => {
        const usersId = [];
        return users.filter((user) => {
          if (usersId.indexOf(user.id) === -1) {
            usersId.push(user.id);
            return true;
          } else {
            return false;
          }
        });
      }),
      map((users: any[]) => {
        users.forEach((user) => {
          user.role = Object.keys(user.roles)[0];
        });
        return users;
      })
    );
  }

  public getUsers(role: string): Observable<any> {
    return this.userDta.getUsers(role);
  }

  public updateUser(dataUser: UserAdmin): Promise<any> {
    return new Promise((resolve, reject) => {
      let status = null;
      this.userDta.updateUser(dataUser)
      .then((data: any) => {
        if (data && true === data) {
          status = true;
        } else if (data && data.status && data.status === 'SVY12') {
          status = false;
        }
        resolve(status);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public removeUser(idUser: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let status = null;
      this.userDta.removeUser(idUser)
      .then((data: any) => {
        if (data && true === data) {
          status = true;
        } else if (data &&  data.status && data.status === 'SVY12') {
          status = false;
        }
        resolve(status);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  // public signOutUser(): void {
  //   this.userDta.signOutUser().then((status: boolean) => {
  //     console.log('ENTRO EN USERSERVICE');
  //     this.router.navigate(['users/login']);
  //   })
  //   .catch(() => {
  //     console.error('Error al cerrar sesion');
  //   });
  // }

  public rememberPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userDta.rememberPassword(email).then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  }

}
