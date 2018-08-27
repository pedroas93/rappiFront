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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

