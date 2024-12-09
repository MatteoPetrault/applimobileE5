// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private baseUrl = 'http://localhost:3001/api'; // Changez selon votre API

    constructor(private http: HttpClient) { }

    getInscriptionsEnAttente(): Observable<any> {
        return this.http.get(`${this.baseUrl}/inscription-attente`);
    }
    /*refuser(userId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/inscription-attente/refuser`, userId);
    }*/
    accepterInscription(userId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/inscription-attente/accepter`, userId);
    }
}
