import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'entities/interview/interview';
import { CategoriesDta } from './categoriesDta';
import * as moment from 'moment-timezone';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoriesService {

  constructor( private interviewTestsDta: CategoriesDta) {}

  public getData(): Observable<any> {
    return this.interviewTestsDta.getDataInterviewTests()
    .pipe(
      map((testsData: any[]) => {
                console.log('LA DATA COMPLETA ES ___>', testsData);
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
