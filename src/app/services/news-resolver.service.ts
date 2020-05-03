import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NewsResolver implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(): Observable<any> {
    let newsUrl = '../../../assets/news.json';
    let news;

    return this.http.get(newsUrl, news).pipe(
      map( (dataFromApi) => dataFromApi ),
      catchError( (err) => Observable.throw(err.json().error) )
    )
  }
}