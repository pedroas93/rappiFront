import { MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
// import { AuthService } from '../../../providers/auth/AuthService';
import { Subscription } from 'rxjs';
// import { UserAdmin } from '../../../entities/user';

@Component({
  selector: 'app-component-layouts-back',
  templateUrl: './back.html',
  styleUrls: [ './back.scss' ],
  providers: [MediaMatcher]
})
export class ComponentLayoutsBack implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private userSubscription: Subscription;
  // public user: UserAdmin;
  roleAdmintechs: any;
  roleAdmin: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // this.user = {firstName: '', lastName: '', email: '', roles: null};
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // this.userSubscription = this.auth.user$.subscribe((info: any) => {
    //   if (info) {
    //     this.user = {...info};
    //     this.roleAdmintechs = info.roles.adminTechs;
    //     this.roleAdmin = info.roles.admin;
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

