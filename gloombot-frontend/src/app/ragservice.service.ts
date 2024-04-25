import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RagService {

  constructor(private http: HttpClient) { }

  getAnswer(question: string): Observable<string> {
    return this.http.get('http://localhost:5000/query?text=' + question, {responseType: 'text'});
  }
}
