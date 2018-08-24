import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'entities/interview/interview';
import { ShopDta } from './shopDta';
import * as moment from 'moment-timezone';
import { map } from 'rxjs/operators';

@Injectable()
export class ShopService {

  constructor( private interviewTestsDta: ShopDta) {}

  public updateProduct(producto): void {
    console.log('Entra por aqui a shopService');
    this.interviewTestsDta.updateProduct(producto);
  }

  public getInterview(): void {
    console.log('LLEGO');
  }


}
