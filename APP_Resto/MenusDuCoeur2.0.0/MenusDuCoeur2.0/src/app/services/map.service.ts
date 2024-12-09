import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private apiUrl = 'http://localhost:3001/api/nbbenevolemanquant'; // URL API

    constructor(private http: HttpClient) { }
    getEventsWithColors(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
    getCities(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3001/api/evenements'); // L'URL de l'API Express
    }
}
