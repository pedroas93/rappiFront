import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Interview } from 'entities/interview/interview';
import { nodeServer } from 'environments/environment';
import { map } from 'rxjs/operators';




@Injectable()
export class SubLevelsDta {

  constructor(private aft: AngularFirestore, private http: HttpClient ) {
  }


  public getDataInterviewTests(path: any ): Observable<any> {
    console.log('ESTA LLEGANDO?????');
    console.log(path);
    const itemsTests = this.aft.collection(path)
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

  public getDataInterviewProducts(path: any ): Observable<any> {
    console.log('---------POR AQUI ES-----------', path);
    const itemsTests = this.aft.collection('products', ref => ref.where('sublevel_id', '==', path))
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

  // public removeInterviewTests(idInterviewTests: string): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //       const url = `${nodeServer}/interview/${idInterviewTests}`;
  //       const subscriptionService: Subscription = this.http.delete(url)
  //       .subscribe((data) => {
  //         subscriptionService.unsubscribe();
  //         resolve(data);
  //       }, (error) => {
  //         subscriptionService.unsubscribe();
  //         reject(error);
  //       });
  //     });
  // }


  // public createInterviewTests(newObject: Interview): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview/`;
  //     const subscriptionService: Subscription = this.http.post(url, newObject)
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

  // public updateInterviewTests(dataObject: Interview): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview`;
  //     const subscriptionService: Subscription = this.http.patch(url, dataObject)
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

  // public shangeDynamicStatus(idTests: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview/status/${idTests}`;
  //     const subscriptionService: Subscription = this.http.patch(url, '')
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

  // public addMultimedia(infoMultimedia: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview/multimedia`;
  //     const subscriptionService: Subscription = this.http.post(url, infoMultimedia)
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

  // public updateMultimedia(infoMultimedia: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview/multimedia`;
  //     const subscriptionService: Subscription = this.http.patch(url, infoMultimedia)
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

  // public getMultimedias(idInterview: string): Observable<any> {
  //   return this.aft.collection(`interview/${idInterview}/multimedia`, ref => ref.where('status', '>=', 1))
  //   .snapshotChanges()
  //   .pipe(
  //     map((changes: any) => {
  //         return changes.map((a: any) => {
  //             const data = a.payload.doc.data();
  //             const id = a.payload.doc.id;
  //             return { id, ...data };
  //         });
  //     })
  //   );
  // }

  // public deleteMultimedia( idInterview: string, idMultimedia: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${nodeServer}/interview/multimedia/${idInterview}/${idMultimedia}`;
  //     const subscriptionService: Subscription = this.http.delete(url)
  //     .subscribe((data) => {
  //       subscriptionService.unsubscribe();
  //       resolve(data);
  //     }, (error) => {
  //       subscriptionService.unsubscribe();
  //       reject(error);
  //     });
  //   });
  // }

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
