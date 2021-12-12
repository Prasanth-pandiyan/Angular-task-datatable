import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  user_list = [];
  Base_url = 'https://www.universal-tutorial.com/api';

  constructor(private http: HttpClient) { }

  post(url): Observable<any> {
    return this.http.get(`${this.Base_url}/`+url).pipe(tap(res=>res));
  }

}
