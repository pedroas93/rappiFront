import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserAdmin } from 'entities/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Loading, AlertService, UserService } from 'providers/providers.index';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.html',
  styleUrls: [ './create.scss' ]
})
export class ComponentUserCreate implements OnInit, OnChanges, OnDestroy {

  @Input() inputDataUser: any = null;
  @Output() resetForm = new EventEmitter<any>();
  public formCreate: FormGroup;
  public msgSuccess: any;
  public msgError: any;
  public creating: boolean;
  public roles: any;
  public responseEdit: any;
  public statusFormEdit: any;
  public messageTranslateSubcription: Subscription;

  constructor(private userSrv: UserService,
    public loader: Loading,
    public alertSrv: AlertService,
    public trasnlateService: TranslateService) {
    this.roles = [];
    this.responseEdit = {};
    this.statusFormEdit = {statusEdit: false, stateBtnCancel: false, cloneDataForm: {} };
    this.createForm();
  }

  ngOnChanges(changes): void {
    if (changes.inputDataUser.currentValue && changes.inputDataUser.currentValue !== undefined) {
      this.setFormEdit(changes.inputDataUser.currentValue);
    }
  }

  ngOnInit(): void {
    this.roles = environment.roles;
  }

  ngOnDestroy(): void {
    if (this.messageTranslateSubcription) { this.messageTranslateSubcription.unsubscribe(); }
  }

  create(): any {
    if (this.formCreate.valid) {
      this.loader.show();
      let createOrUpdateUser: Promise<any>;
      const user: UserAdmin = this.formCreate.value;
      user.idUser = this.statusFormEdit.cloneDataForm.id;
      const role = this.formCreate.controls['roles'].value;
      user.roles = {[role]: true};
      if (this.statusFormEdit.statusEdit) {
        const cloneData = this.statusFormEdit.cloneDataForm;
        const rolClone = this.getValidateRol(cloneData.roles);
        const rolUser = this.getValidateRol(user.roles);
        createOrUpdateUser = this.userSrv.updateUser(user);
      } else {
        this.creating = true;
        createOrUpdateUser = this.userSrv.createUserAdmin(user);
      }
      createOrUpdateUser
      .then((res: any) => {
        this.loader.hide();
        if (this.statusFormEdit.statusEdit) {
          if (res) {
            this.msgSuccess = {res: true, msg: null};
            this.alertSrv.success(this.translate('USER.DATA_SUCCESS'));
            this.onCancel();
          } else {
            this.alertSrv.warning(this.translate('USER.INVALID_ROL_BASSIC'));
            this.msgError = {res: true, msg: null};
          }
        } else {
          this.creating = false;
          if (res.error && res.error.code === 'auth/email-already-exists') {
            if (this.msgSuccess && this.msgSuccess.status) { this.msgSuccess.status = false; }
            this.msgError = {status: true, msg: null};
            this.alertSrv.warning(this.translate('USER.EMAIL_ALREADY_USE'));
          } else {
            if (this.msgError && this.msgError.status) { this.msgError.status = false; }
            this.msgSuccess = {status: true, msg: null};
            this.alertSrv.success(this.translate('USER.USER_CREATED'));
            this.formCreate.reset();
          }
        }
      })
      .catch((error) => {
        this.loader.hide();
        if (this.statusFormEdit.statusEdit) {
          this.msgError = {status: true, msg: null};
          this.alertSrv.error(this.translate('USER.ERROR_SYSTEM'));
        } else {
          this.creating = false;
          if (error.code && error.code === 'auth/email-already-exists') {
            this.msgError = {status: true, msg: null};
            this.alertSrv.warning(this.translate('USER.EMAIL_ALREADY_USE'));
          } else {
            this.alertSrv.error(this.translate('USER.AN_ERROR_UNEXPECTED_HAS_OCCURRED'));
            this.msgError = {status: true, msg: null};
          }
        }
      });
    }
  }

  public createForm(firstName: string = '', lastName: string = '', email: string = '', roles: string = ''): void {
    this.formCreate = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'roles': new FormControl(roles, Validators.required)
    });
  }

  public setFormEdit(formData: any): void {
    if (formData.lastName && formData.firstName && formData.email) {
      this.formCreate.get('email').disable();
      this.statusFormEdit.statusEdit = true;
      const rolUser: string = this.getValidateRol(formData.roles);
      this.createForm(formData.firstName, formData.lastName, formData.email, rolUser);
      this.statusFormEdit.cloneDataForm = formData;
      this.statusFormEdit.stateBtnCancel = true;
    }
  }

  public onCancel(): void {
    this.formCreate.reset();
    this.clearData();
    this.resetForm.emit({});
    this.formCreate.get('email').enable();
  }

  public clearData(): void {
    this.statusFormEdit.statusEdit = false;
    this.statusFormEdit.stateBtnCancel = false;
    this.statusFormEdit.cloneDataForm = {};
  }

  public getValidateRol(objectRol: any): string {
    let rolUser: string;
    if (objectRol && objectRol.admin) {
      rolUser = 'admin';
    } else if (objectRol && objectRol.professional) {
      rolUser = 'professional';
    } else {
      rolUser = '';
    }
    return rolUser;
  }

  private translate(value: string) {
    let dataFunction = '';
    this.messageTranslateSubcription = this.trasnlateService.get(value)
    .subscribe((data: any) => {
      dataFunction = data;
    });
    return dataFunction;
  }
}

