import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class FileService {
    url = "http://localhost:3000/file";
    constructor(private http: Http) {};
    getAllFiles(): Observable<any> {
        return this.http.get(this.url)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
    getTest(testName: string): Observable<any> {
        console.log("service" + testName);
        let myParams = new URLSearchParams();
        myParams.append('TestName',testName);
        let options= new RequestOptions({params: myParams})
        return this.http.get(this.url,options)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
}