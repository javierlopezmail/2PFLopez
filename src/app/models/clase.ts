import { Curso } from './curso';
import { Alumno } from './alumno';

export interface Clase {
  id: number;
  horaInicio: string;  // Formato HH:mm
  duracion: number;    // Duración en horas
  curso: Curso;
  alumnos: Alumno[];
}