import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ErrorService } from "../errors/error.service";
import 'rxjs/Rx';
@Injectable()
export class DevService {
    devUrl = "http://lebyihu.win.ansys.com:3000/api/dev";
    constructor(private http: Http, private errorService: ErrorService) {};
    
    getAllConvNum(TestsArray: String[], path1: String, path2: String, 
                    version: String, runMode: String,thread: String) {
        var input = [
            {"Tests": TestsArray},
            {"run1": path1}, 
            {"run2": path2}, 
            {"version": version}, 
            {"runMode": runMode},
            {"thread": thread}
        ];
        console.log("in+++++++++++put");
        console.log(input);
        const body=JSON.stringify(input);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.devUrl, body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }

    resUrl = "http://lebyihu.win.ansys.com:3000/api/residual";
    getResidual(testName: String,journalName: String, outDir1: String, outDir2: String) {
        var input = [
            {"testName":testName},
            {"journalName":journalName},
            {"outDir1":outDir1},
            {"outDir2":outDir2},
        ]
        const body=JSON.stringify(input);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.resUrl, body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
}