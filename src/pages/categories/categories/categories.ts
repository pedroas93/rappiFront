import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Loading, CategoriesService, AlertService } from 'providers/providers.index';


@Component({
  selector: 'app-page-categories',
  templateUrl: './categories.html',
  styleUrls: [ './categories.scss' ]
})

export class PageCategories implements OnInit, OnDestroy {

  public dataTests: any[];
  public interviewEvent: any;
  public clearSetTimeout: any;
  public subs_modal_cahnge_status: Subscription;
  public dataTestsSubcribe: Subscription;
  public titleInterview: String;
  public loadingData: Boolean;
  public dataPath: string;

  constructor(
    public interview: CategoriesService,
    public loader: Loading,
    public alertSrv: AlertService,
    public translateService: TranslateService,
    public router: Router
  ) {
    console.log('----LLEGO AL CONSTRUCtor PageCategories');
    this.dataTests = [];
    this.loadingData = true;
  }



  public ngOnInit(): void {
    console.log('----- pageCategories');
    this.dataTestsSubcribe = this.interview.getData()
    .subscribe((data) => {
      this.loadingData = false;
      this.dataTests = data;
      console.log(data);
    });
  }

  public ngOnDestroy(): void {
    if (this.dataTestsSubcribe) { this.dataTestsSubcribe.unsubscribe(); }
    if (this.subs_modal_cahnge_status) { this.subs_modal_cahnge_status.unsubscribe(); }
  }

  public dataConfig = {
    headBoard: [
      {
        id: 'name',
        title: 'nombre',
        orderFilter: true,
        viewAction: true
      },
      {
        id: 'id',
        title: 'id',
        orderFilter: true
      }
    ],
    action:  {
    },
    pageSize: 10
  };


  public showMultimedia(data: any): void {
    if (data.id) {

      console.log('ENTRA A ESTE METODO-->', data.id);
      this.dataPath = data.id + 'sublevels';
      console.log('LA URL QUEDA ASI', this.dataPath);
      this.router.navigate([`categories/${this.dataPath}`]);
    } else {
      this.alertSrv.error('Error');
    }
  }
}
