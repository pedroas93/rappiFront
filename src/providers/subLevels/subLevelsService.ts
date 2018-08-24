import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'entities/interview/interview';
import { SubLevelsDta } from './subLevelsDta';
import * as moment from 'moment-timezone';
import { map } from 'rxjs/operators';

@Injectable()
export class SubLevelsService {

  constructor( private interviewTestsDta: SubLevelsDta) {}

  public getData(path: any): Observable<any> {
      console.log('EL PATH QUE LLEGA ES SUB LEVEL-->', path);
    return this.interviewTestsDta.getDataInterviewTests(path)
    .pipe(
      map((testsData: any[]) => {
        console.log('LA DATA Normal COMPLETA ES ___>', testsData);
        testsData.forEach((test: any) => {
        const strin = 'YYYY-MM-DD h:mm a';
        // test.date = moment(test.date.seconds * 1000).format(strin);
        });
        return testsData;
      })
    );
  }

  public getDataProducts(path: any): Observable<any> {
    console.log('EL PATH QUE LLEGA ES PRODUCTO-->', path);
  return this.interviewTestsDta.getDataInterviewProducts(path)
  .pipe(
    map((testsData: any[]) => {
      console.log('LA DATA Con PRODUCTOS COMPLETA ES ___>', testsData);
      testsData.forEach((test: any) => {
      const strin = 'YYYY-MM-DD h:mm a';
      // test.date = moment(test.date.seconds * 1000).format(strin);
      });
      return testsData;
    })
  );
  }

  public getInterview(idInterview: string): Observable<Interview> {
    return this.interviewTestsDta.getInterview(idInterview);
  }


}
