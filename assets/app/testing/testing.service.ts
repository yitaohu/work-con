import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class TestingService {
    url = "http://lebyihu.win.ansys.com:3000/testing";
    constructor(private http: Http) {};
    getAllFiles(): Observable<any> {
        return this.http.get(this.url)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
    getTest(qValue: string[]): Observable<any> {
        let myParams = new URLSearchParams();
        myParams.append('testListPath',qValue[0]);
        myParams.append('beginTime',qValue[1]);
        myParams.append('endTime',qValue[2]);
        myParams.append('precision',qValue[3]);
        myParams.append('runType',qValue[4]);
        myParams.append('thread',qValue[5]);
        myParams.append('interconnect',qValue[6]);
        myParams.append('mpi',qValue[7]);
        myParams.append('platform',qValue[8]);
        myParams.append('buildId',qValue[9]);
        myParams.append('testEngineer',qValue[10]);
        // myParams.append('resultsDir',qValue[11]);
        myParams.append('databaseTable',qValue[11]);

        console.log(qValue);
        let options= new RequestOptions({params: myParams})
        return this.http.get(this.url,options)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
}