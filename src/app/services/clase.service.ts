import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clase } from '../models/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private clasesSource = new BehaviorSubject<Clase[]>([]);
  private clases$ = this.clasesSource.asObservable();

  constructor() {}

  getClases(): Observable<Clase[]> {
    return this.clases$;
  }

  addClase(clase: Clase): void {
    const currentClases = this.clasesSource.value;
    const updatedClases = [...currentClases, clase];
    this.clasesSource.next(updatedClases);
  }

  updateClase(updatedClase: Clase): void {
    const currentClases = this.clasesSource.value;
    const clases = currentClases.map(clase => {
      return clase.id === updatedClase.id ? updatedClase : clase;
    });
    this.clasesSource.next(clases);
  }

  deleteClase(id: number): void {
    const currentClases = this.clasesSource.value;
    const filteredClases = currentClases.filter(clase => clase.id !== id);
    this.clasesSource.next(filteredClases);
  }
}