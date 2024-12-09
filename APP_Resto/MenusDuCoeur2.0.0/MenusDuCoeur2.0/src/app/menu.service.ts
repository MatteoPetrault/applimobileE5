import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = "http://localhost:3001/login";
    return this.http.post(url, { email, password });
  }
}
