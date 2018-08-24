import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.html'
})
export class ComponentSharedConfirm {
  constructor(
    public dialogRef: MatDialogRef<ComponentSharedConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  close() {
    this.dialogRef.close(false);
  }

}
