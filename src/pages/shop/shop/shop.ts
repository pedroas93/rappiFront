import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Loading, ShopService, AlertService } from 'providers/providers.index';


@Component({
  selector: 'app-page-shop',
  templateUrl: './shop.html',
  styleUrls: [ './shop.scss' ]
})

export class PageShop implements OnInit, OnDestroy {


  public dataTests: any[];
  public shopEvent: any;
  public clearSetTimeout: any;
  public subs_modal_cahnge_status: Subscription;
  public dataTestsSubcribe: Subscription;
  public titleInterview: String;
  public loadingData: Boolean;
  public dataPath: string;
  public cant: string;

  constructor(
    public interview: ShopService,
    public loader: Loading,
    public alertSrv: AlertService,
    public translateService: TranslateService,
    public router: Router
  ) {
    this.dataTests = [];
    this.loadingData = true;
  }



  public ngOnInit(): void {
    for ( let i = 0; i < localStorage.length; i++) {
        this.dataTests[this.dataTests.length] =  JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    this.loadingData = false;
    this.cant = '0';
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
        id: 'sublevel_id',
        title: 'sub nivel',
        orderFilter: true
      },
      {
        id: 'price',
        title: 'precio',
        orderFilter: true
      },
      {
        id: 'available',
        title: 'Disponible',
        orderFilter: true
      },
      {
        id: 'quantity',
        title: '# de Productos',
        orderFilter: true
      }
    ],
    action:  {
      edit: true,
      delete: true
    },
    pageSize: 10
  };

  public removeTests(data: any): void {
    localStorage.removeItem(data.id);
    this.dataTests = [];
    for ( let i = 0; i < localStorage.length; i++) {
      this.dataTests[this.dataTests.length] =  JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    this.alertSrv.success('Se a eliminado el producto ' + data.name + ' del carrito de compras');
  }

  public editShopTests($event): void {
    this.shopEvent = $event;
  }
}
