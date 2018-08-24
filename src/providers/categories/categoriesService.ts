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
  // public removeInterviewTests(idInterviewTests: string): Promise<any> {
  //   return this.interviewTestsDta.removeInterviewTests(idInterviewTests);
  // }

  // public createInterviewTest(newObjectinterviewTests: any): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     const newObject: Interview = {
  //       title: newObjectinterviewTests.title,
  //       description: newObjectinterviewTests.description,
  //       interviewed: newObjectinterviewTests.interviewed,
  //       interviewer: newObjectinterviewTests.interviewer,
  //       status: 2,
  //       image: {
  //         base64: newObjectinterviewTests.base64,
  //         type: newObjectinterviewTests.type
  //       }
  //     };
  //     this.interviewTestsDta.createInterviewTests(newObject)
  //     .then((status1) => {
  //       resolve({ status: status1 });
  //     })
  //     .catch(error => {
  //       reject(error);
  //     }) ;
  // });
  // }

  // public updateInterviewTests(objectTests: any) {
  //   return new Promise((resolve, reject) => {
  //     const rta: any = {status: false, msg: ''};
  //     const newObject: Interview = {
  //       title: objectTests.title,
  //       description: objectTests.description,
  //       interviewed: objectTests.interviewed,
  //       interviewer: objectTests.interviewer,
  //       idInterview: objectTests.id
  //     };
  //       if (objectTests.type !== null && objectTests.base64 !== null ) {
  //         newObject.image = {
  //             base64: objectTests.base64,
  //             type: objectTests.type
  //           };
  //       }
  //     this.interviewTestsDta.updateInterviewTests(newObject)
  //     .then((response: any) => {
  //       if (response) {
  //         rta.status = true;
  //       } else {
  //         rta.status = false;
  //       }
  //       resolve(rta);
  //     })
  //     .catch((error: any) => {
  //       rta.status = false;
  //       rta.msg = error;
  //       reject(rta);
  //     });
  //   });
  // }

  // public changeStateDynamic(idTests: string): Promise<any> {
  //   return this.interviewTestsDta.shangeDynamicStatus(idTests);
  // }

}
