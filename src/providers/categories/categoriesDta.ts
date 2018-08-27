import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Interview } from 'entities/interview/interview';
import { nodeServer } from 'environments/environment';
import { map } from 'rxjs/operators';




@Injectable()
export class CategoriesDta {

  constructor(private aft: AngularFirestore, private http: HttpClient ) {
  }


  public getDataInterviewTests(): Observable<any> {
    const itemsTests = this.aft.collection('/categories')
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
    return itemsTests;
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
