import { Component, OnInit, EventEmitter, Input, OnChanges, Output, OnDestroy, SimpleChanges } from '@angular/core';
import { ShopService } from 'providers/providers.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Loading } from '../../providers/loading/Loading';
import { TranslateService } from '@ngx-translate/core';
import { AlertService} from '../../providers/alert/alert';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-component-form-shop',
    templateUrl: './shop.html',
    styleUrls: ['./shop.scss']
  })

export class ComponentShop implements OnInit, OnChanges, OnDestroy {

  @Output() changeUpdateDataTests: EventEmitter<any> = new EventEmitter();
  @Input() newShop: any;

  public formShop: FormGroup;
  public price: FormControl;
  public quantity: FormControl;
  public imageForm: FormControl;
  public sublevel_id: FormControl;
  public available:  FormControl;
  public id:  FormControl;
  public name: FormControl;
  public inputImage: FormControl;
  public total: FormControl;
  public pageShop: any;

  public cloneDataEdit: any;
  public extensions: Object;
  public validExtension: boolean;
  public currentImageUrl: string;
  public extensionsSubscribe: Subscription;
  public stateBtnEdit: { idItenrview: string, status: boolean } = { idItenrview: null, status: null };

  public constructor(
    private loading: Loading,
    private alertSrv: AlertService,
    public shop: ShopService,
    private trasnlateService: TranslateService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.newShop.currentValue !== undefined) {
      this.validExtension = null;
      this.currentImageUrl = changes.newShop.currentValue.image;
      this.cloneDataEdit = changes.newShop.currentValue;
      this.setFormEditShopTests(changes.newShop.currentValue);
    }
  }

  public ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  public createFormControls(): void {
    this.price = new FormControl('', [ Validators.required ]);
    this.imageForm = new FormControl('', []);
    this.inputImage = new FormControl('', []);
    this.total = new FormControl('0', []);
    this.quantity = new FormControl('', [ Validators.required ]);
    this.id = new FormControl('', [ Validators.required ]);
    this.name = new FormControl('', [ Validators.required ]);
    this.sublevel_id = new FormControl('', [ Validators.required ]);
    this.available = new FormControl('', [ Validators.required ]);
  }

  public createForm(): void {
    this.formShop = new FormGroup({
      price: this.price,
      name: this.name,
      quantity: this.quantity,
      imageForm: this.imageForm,
      sublevel_id: this.sublevel_id,
      available: this.available,
      inputImage: this.imageForm,
      total: this.total,
      id: this.id
    });
  }

  public onSubmit(infoFrm: any): void {
    const newObjectData = { ...infoFrm};
      if ( newObjectData.available === true) {
        this.updateShop(newObjectData);
      } else {
        this.alertSrv.warning("EL PRODUCTO NO ESTA DISPONIBLE, INTENTELO MAS TARDE");
      }
  }

  private updateShop(newObjectData): void {

    this.shop.updateProduct(newObjectData);
    this.alertSrv.success('FELICITACIONES POR COMPRAR EN TIENDAS EL BARATON');
    this.clearForm();
    localStorage.removeItem(newObjectData.id);
    this.changeUpdateDataTests.emit();
  }

  public cancelUpdate(): void {
    this.stateBtnEdit = null;
    this.clearForm();
    this.changeUpdateDataTests.emit({});
  }

  public setFormEditShopTests(newData ): void {
    this.currentImageUrl = newData.image;
    this.stateBtnEdit.status = true;
    this.name.setValue(newData.name);
    this.price.setValue(newData.price);
    this.quantity.setValue(newData.quantity);
    this.sublevel_id.setValue(newData.sublevel_id);
    this.available.setValue(newData.available);
    this.id.setValue(newData.id);
    this.total.setValue('0');
    this.createForm();
  }


  public clearForm(): void {
    this.validExtension = null;
    this.currentImageUrl = null;
    this.formShop.reset();
    this.stateBtnEdit.status = null;
    this.stateBtnEdit.idItenrview = null;
}

  public ngOnDestroy(): void {
    if (this.extensionsSubscribe) { this.extensionsSubscribe.unsubscribe(); }
  }

}
