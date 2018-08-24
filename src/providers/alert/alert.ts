import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { ComponentSharedConfirm } from 'components/shared/confirm/confirm';
import {Observable} from 'rxjs';
@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {}

  success(message: string) {
    this.snackBar.open(message, null, {
        duration: 4000,
        panelClass: [`alert`, `alert-success`]
      });
  }

  error(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      panelClass: [`alert`, `alert-danger`]
    });
  }

  info(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      panelClass: [`alert`, `alert-info`]
    });
  }

  warning(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      panelClass: [`alert`, `alert-warning`]
    });
  }

  confirm(body: string): Observable<any> {
    return this.dialog.open(ComponentSharedConfirm, {
      width: '250px',
      data: {body}
    })
    .afterClosed();
  }

}


