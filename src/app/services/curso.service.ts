import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos: Curso[] = [
    { id: 1, nombre: 'Angular', costo: 300 },
    { id: 2, nombre: 'React', costo: 200 },
    { id: 3, nombre: 'Node JS', costo: 300 },
    { id: 4, nombre: 'C#', costo: 400 },
    { id: 5, nombre: 'Java', costo: 400 }
  ];
  private cursosSubject: BehaviorSubject<Curso[]> = new BehaviorSubject(this.cursos);

  constructor() {}

  getCursos(): Observable<Curso[]> {
    return this.cursosSubject.asObservable();
  }

  addCurso(curso: Curso): Observable<Curso> {
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
    return of(curso);
  }

  updateCurso(curso: Curso): Observable<Curso> {
    const index = this.cursos.findIndex(a => a.id === curso.id);
    if (index !== -1) {
      this.cursos[index] = curso;
      this.cursosSubject.next(this.cursos);
      return of(curso);
    }
    throw new Error('Curso no encontrado');
  }

  deleteCurso(id: number): Observable<boolean> {
    const index = this.cursos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.cursos = this.cursos.filter(a => a.id !== id);
      this.cursosSubject.next(this.cursos);
      return of(true);
    }
    throw new Error('Curso no encontrado');
  }

  getCursoById(id: number): Curso | undefined {
    let curso = this.cursos.find(curso => curso.id == id); 
    return curso;
  }
}
