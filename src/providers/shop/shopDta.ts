import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Interview } from 'entities/interview/interview';
import { nodeServer } from 'environments/environment';
import { map } from 'rxjs/operators';




@Injectable()
export class ShopDta {

  constructor(private aft: AngularFirestore, private http: HttpClient ) {
  }


  public updateProduct(product): void {
    console.log('EN SHOPDATA ES:::>', product);
    const num1 = parseInt(product.quantity, 10);
    const num2 = product.total;
    const num3 = num1 - num2;
    console.log('LA CANTIDAD ES___>', num1 , num2, num3 );
    product.quantity = num3;
    console.log('LA quantity ES___>', product.quantity );
    const newObject: any = {
      name: product.name,
      available: product.available,
      price: product.price,
      quantity: product.quantity,
      sublevel_id: product.sublevel_id
    };

    this.aft.collection('products')
    .doc(product.id)
    .update(newObject)
  }

  public getInterview(idInterview: string): Observable<Interview> {
    return this.aft.doc<Interview>(`interview/${idInterview}`)
    .snapshotChanges()
    .pipe(
      map((changes: any) => {
          return changes.map((a: any) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
      })
    );
  }


}
