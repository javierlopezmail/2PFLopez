import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Clase } from '../models/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private clases: Clase[] = [
    { 
      id: 1, 
      horaInicio: '20:00', 
      duracion: 2, 
      curso: { id: 1, nombre: 'Angular', costo: 300 },
      alumnos: [] 
    }
  ];
  private clasesSubject: BehaviorSubject<Clase[]> = new BehaviorSubject(this.clases);

  constructor() {}

  getClases(): Observable<Clase[]> {
    return this.clasesSubject.asObservable();
  }

  addClase(clase: Clase): Observable<Clase> {
    this.clases.push(clase);
    this.clasesSubject.next(this.clases);
    return of(clase);
  }

  updateClase(clase: Clase): Observable<Clase> {
    const index = this.clases.findIndex(a => a.id === clase.id);
    if (index !== -1) {
      this.clases[index] = clase;
      this.clasesSubject.next(this.clases);
      return of(clase);
    }
    throw new Error('Clase no encontrada');
  }

  deleteClase(id: number): Observable<boolean> {
    const index = this.clases.findIndex(a => a.id === id);
    if (index !== -1) {
      this.clases = this.clases.filter(a => a.id !== id);
      this.clasesSubject.next(this.clases);
      return of(true);
    }
    throw new Error('Clase no encontrada');
  }

  getClaseById(id: number): Clase | undefined {
    let clase = this.clases.find(clase => clase.id == id); 
    return clase;
  }
}

