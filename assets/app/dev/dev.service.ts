import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Response, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class DevService {
    url = "http://localhost:3000/dev";
    constructor(private http: Http) {};
    
    getConvNum(path: String) {
        const body=JSON.stringify(path);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.url, body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }
    
}