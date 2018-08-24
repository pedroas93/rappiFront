import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Loading, SubLevelsService, AlertService } from 'providers/providers.index';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


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
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
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
    let cont = 0;
    let palabra = 12;

      while ( palabra < this.pathRouter.length ) {
        if ( this.pathRouter[palabra] === 's') {
          this.newPalabra = this.newPalabra + '/sublevels/';
          palabra += 9;
          cont = 0;
        } else {
          if ( cont === 0) {
          this.newPalabra = this.newPalabra + this.pathRouter[palabra] ;
          this.nextNum = this.pathRouter[palabra];
          cont++;
          palabra++;
          } else {
            this.newPalabra = this.newPalabra + this.nextNum + this.pathRouter[palabra];
            this.nextNum = this.nextNum + this.pathRouter[palabra];
            cont++;
            palabra++;
          }
        }
      }

      console.log('------+++++++', this.nextNum);
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
      this.dataPath = this._router.url + data.id + 'sublevels' ;
      this.router.navigate([`list/${this.dataPath}`]);
    } else {
      this.alertSrv.error('Error');
    }
  }

  public selectecdProduct(data: any): void {
    this.alertSrv.success('Se a agregado el producto ' + data.name + ' al carrito de compras');
    localStorage.setItem(data.id, JSON.stringify(data));
  }
}
