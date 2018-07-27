import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { ErrorService } from "../errors/error.service";
import 'rxjs/Rx';
@Injectable()
export class TestingService {
    url = "http://lebyihu.win.ansys.com:3000/api/testing";
    constructor(private http: Http, private errorService: ErrorService) {};
    // getAllFiles(): Observable<any> {
    //     return this.http.get(this.url)
    //             .map((response: Response) => response.json())
    //             .catch((error: Response) => Observable.throw(error.json()));
    // }
    getTest(qValue: string[]): Observable<any> {
        let myParams = new URLSearchParams();
        myParams.append('testListPath',qValue[0]);
        myParams.append('days',qValue[1]);
        myParams.append('runType',qValue[2]);
        myParams.append('thread',qValue[3]);
        myParams.append('platform',qValue[4]);
        myParams.append('buildId',qValue[5]);
        myParams.append('testEngineer',qValue[6]);
        myParams.append('resultsDir',qValue[7]);
        myParams.append('customBuildPath',qValue[8]);
        myParams.append('version',qValue[9]);

        console.log(qValue);
        let options= new RequestOptions({params: myParams})
        return this.http.get(this.url,options)
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }
}