import { Alumno } from './alumno';

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Alumno | Alumno[];  // Puede ser un solo alumno o un array de alumnos
}