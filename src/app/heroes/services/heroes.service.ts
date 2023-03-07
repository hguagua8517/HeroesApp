import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Heroes[]> {
   return this.http.get<Heroes[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesPorId(id: string): Observable<Heroes> {
    return this.http.get<Heroes>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias( termino: string): Observable<Heroes[]>{
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=9`);
  }

  agregarHeroe( heroe: Heroes): Observable<Heroes>{
    return this.http.post<Heroes>(`${this.baseUrl}/heroes`, heroe); 
   }
   actualizarHeroe( heroe: Heroes): Observable<Heroes>{
    return this.http.put<Heroes>(`${this.baseUrl}/heroes/${heroe.id}`, heroe); 
   }
   eliminarHeroe( id: string ): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`); 
   }
}
