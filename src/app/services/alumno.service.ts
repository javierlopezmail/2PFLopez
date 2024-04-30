import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', fechaNacimiento: new Date('2000-04-15'), curso: 'Matemáticas' },
    { id: 2, nombre: 'Ana', apellido: 'Gomez', email: 'ana.gomez@example.com', fechaNacimiento: new Date('2001-03-10'), curso: 'Física' },
    { id: 3, nombre: 'Carlos', apellido: 'Martinez', email: 'carlos.martinez@example.com', fechaNacimiento: new Date('2002-05-21'), curso: 'Química' },
    { id: 4, nombre: 'Luisa', apellido: 'Lopez', email: 'luisa.lopez@example.com', fechaNacimiento: new Date('1999-07-30'), curso: 'Biología' },
    { id: 5, nombre: 'Sofía', apellido: 'Fernandez', email: 'sofia.fernandez@example.com', fechaNacimiento: new Date('2000-02-17'), curso: 'Historia' },
    { id: 6, nombre: 'Marco', apellido: 'Diaz', email: 'marco.diaz@example.com', fechaNacimiento: new Date('2001-08-25'), curso: 'Geografía' },
    { id: 7, nombre: 'Lucía', apellido: 'Ruiz', email: 'lucia.ruiz@example.com', fechaNacimiento: new Date('2002-12-14'), curso: 'Literatura' },
    { id: 8, nombre: 'Daniel', apellido: 'Moreno', email: 'daniel.moreno@example.com', fechaNacimiento: new Date('1998-11-05'), curso: 'Arte' },
    { id: 9, nombre: 'Carmen', apellido: 'Jimenez', email: 'carmen.jimenez@example.com', fechaNacimiento: new Date('1999-01-22'), curso: 'Filosofía' },
    { id: 10, nombre: 'Fernando', apellido: 'Navarro', email: 'fernando.navarro@example.com', fechaNacimiento: new Date('2001-10-03'), curso: 'Ingeniería' }
  ];
  private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject(this.alumnos);

  constructor() {}

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnosSubject.asObservable();
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    this.alumnos.push(alumno);
    this.alumnosSubject.next(this.alumnos);
    return of(alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
      this.alumnosSubject.next(this.alumnos);
      return of(alumno);
    }
    throw new Error('Alumno no encontrado');
  }

  deleteAlumno(id: number): Observable<boolean> {
    const index = this.alumnos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.alumnos = this.alumnos.filter(a => a.id !== id);
      this.alumnosSubject.next(this.alumnos);
      return of(true);
    }
    throw new Error('Alumno no encontrado');
  }

  getAlumnoById(id: number): Alumno | undefined {
    let alumno = this.alumnos.find(alumno => alumno.id == id); 
    return alumno;
  }
}