import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Loading, SubLevelsService, AlertService } from 'providers/providers.index';


@Component({
  selector: 'app-page-sublevels',
  templateUrl: './subLevels.html',
  styleUrls: [ './subLevels.scss' ]
})

export class PageSubLevels implements OnInit, OnDestroy {

  public dataTests: any[];
  public dataProducts: any[];
  public dataStorage: any[];
  public interviewEvent: any;
  public clearSetTimeout: any;
  public subs_modal_cahnge_status: Subscription;
  public dataTestsSubcribe: Subscription;
  public dataTestsSubcribeP: Subscription;
  public titleInterview: String;
  public loadingData: Boolean;
  public pathRouter: string;
  private dataPath: string;
  private nextNum: string;
  public newPalabra = '/categories/';


  constructor(
    public interview: SubLevelsService,
    public loader: Loading,
    public alertSrv: AlertService,
    public translateService: TranslateService,
    public router: Router,
    private _router: Router
  ) {
    this.dataTests = [];
    this.dataProducts = [];
    this.loadingData = true;
  }



  public ngOnInit(): void {
    this.pathRouter = this._router.url;

    let palabra = 17;

      while ( palabra < this.pathRouter.length ) {
        if ( this.pathRouter[palabra] === 's') {
          this.newPalabra = this.newPalabra + 'sublevels/';
          palabra += 9;
        } else {
          this.newPalabra = this.newPalabra + this.pathRouter[palabra] + '/';
          this.nextNum = this.pathRouter[palabra];
          palabra++;
        }
      }


    this.dataTestsSubcribe = this.interview.getData( this.newPalabra )
    .subscribe((data) => {
      this.loadingData = false;
      this.dataTests = data;
    });
    this.dataTestsSubcribeP = this.interview.getDataProducts(this.nextNum)
    .subscribe((data) => {
      this.loadingData = false;
      this.dataProducts = data;
    });
  }

  public ngOnDestroy(): void {
    if (this.dataTestsSubcribe) { this.dataTestsSubcribe.unsubscribe(); }
    if (this.dataTestsSubcribeP) { this.dataTestsSubcribeP.unsubscribe(); }
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

  public dataConfig2 = {
    headBoard: [
      {
        id: 'name',
        title: 'nombre',
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
        title: 'cantidad',
        orderFilter: true
      }
    ],
    action:  {
      edit: true
    },
    pageSize: 10
  };



  public showMultimedia(data: any): void {
    if (data.id) {
    let palabra = 17;
    let newword = '/categories/';
      while ( palabra < this.pathRouter.length ) {
          newword = newword + this.pathRouter[palabra];
          palabra ++;
    }
      this.dataPath = newword + data.id + 'sublevels' ;

      this.router.navigate([`${this.dataPath}`]);
    } else {
      this.alertSrv.error('Error');
    }
  }

  public selectecdProduct(data: any): void {
    this.alertSrv.success('Se a agregado el producto ' + data.name + ' al carrito de compras');
    localStorage.setItem(data.id, JSON.stringify(data));
  }
}
