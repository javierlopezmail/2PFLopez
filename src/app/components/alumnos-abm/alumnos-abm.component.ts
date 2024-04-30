import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alumnos-abm',
  templateUrl: './alumnos-abm.component.html',
  styleUrls: ['./alumnos-abm.component.scss']
})
export class AlumnosABMComponent implements OnInit {
  alumnoForm: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) {
    this.alumnoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const alumnoId = params['id'];
      if (alumnoId) {
        this.loadAlumnoData(alumnoId);
        this.editing = true;
      }
    });
  }

  onSubmit(): void {
    const alumnoData: Alumno = this.alumnoForm.value;
    if (alumnoData.id) {
      this.alumnoService.updateAlumno(alumnoData).subscribe({
        next: () => {
          this.snackBar.open('Alumno actualizado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al actualizar el alumno', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.alumnoService.addAlumno(alumnoData).subscribe({
        next: () => {
          this.snackBar.open('Alumno añadido exitosamente', 'Cerrar', { duration: 3000 });
          this.clearForm();
        },
        error: () => {
          this.snackBar.open('Error al añadir el alumno', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  deleteAlumno(): void {
    if (this.editing && this.alumnoForm.value.id) {
        this.alumnoService.deleteAlumno(this.alumnoForm.value.id).subscribe({
            next: () => {
                this.snackBar.open('Alumno eliminado exitosamente', 'Cerrar', { duration: 3000 });
                this.clearForm();
            },
            error: () => {
                this.snackBar.open('Error al eliminar el alumno', 'Cerrar', { duration: 3000 });
            }
        });
    }
  }

  clearForm(): void {
    this.alumnoForm.reset();
    this.editing = false;
    
    Object.keys(this.alumnoForm.controls).forEach(key => {
        this.alumnoForm.get(key)?.markAsPristine();
        this.alumnoForm.get(key)?.markAsUntouched();
    });
  }

  cancel(): void {
    this.clearForm();
  }

  setAlumno(alumno: Alumno): void {
    this.alumnoForm.setValue(alumno);
    this.editing = true;
  }

  loadAlumnoData(id: number) {
    const alumno = this.alumnoService. getAlumnoById(id);
    if (alumno != undefined){
        this.alumnoForm.setValue({
            id: alumno.id,
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            email: alumno.email,
            curso: alumno.curso
          });
    }
  }
}