import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseService } from '../../services/clase.service';
import { Clase } from '../../models/clase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clase-abm',
  templateUrl: './clases-abm.component.html',
  styleUrls: ['./clases-abm.component.scss']
})
export class ClasesABMComponent implements OnInit {
  claseForm: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private claseService: ClaseService, private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) {
    this.claseForm = this.fb.group({
      id: [null],
      horaInicio: ['', Validators.required],
      duracion: ['', Validators.required],
      curso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const claseId = params['id'];
      if (claseId) {
        this.loadClaseData(claseId);
        this.editing = true;
      }
    });
  }

  onSubmit(): void {
    const claseData: Clase = this.claseForm.value;
    if (claseData.id) {
      this.claseService.updateClase(claseData).subscribe({
        next: () => {
          this.snackBar.open('Clase actualizada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al actualizar la clase', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.claseService.addClase(claseData).subscribe({
        next: () => {
          this.snackBar.open('Clase añadida exitosamente', 'Cerrar', { duration: 3000 });
          this.clearForm();
        },
        error: () => {
          this.snackBar.open('Error al añadir la clase', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  deleteClase(): void {
    if (this.editing && this.claseForm.value.id) {
        this.claseService.deleteClase(this.claseForm.value.id).subscribe({
            next: () => {
                this.snackBar.open('Clase eliminada exitosamente', 'Cerrar', { duration: 3000 });
                this.clearForm();
            },
            error: () => {
                this.snackBar.open('Error al eliminar la alumno', 'Cerrar', { duration: 3000 });
            }
        });
    }
  }

  clearForm(): void {
    this.claseForm.reset();
    this.editing = false;
    
    Object.keys(this.claseForm.controls).forEach(key => {
        this.claseForm.get(key)?.markAsPristine();
        this.claseForm.get(key)?.markAsUntouched();
    });
  }

  cancel(): void {
    this.clearForm();
  }

  setAlumno(clase: Clase): void {
    this.claseForm.setValue(clase);
    this.editing = true;
  }

  loadClaseData(id: number) {
    const clase = this.claseService.getClaseById(id);
    if (clase != undefined){
        this.claseForm.setValue({
            id: clase.id,
            horaInicio: clase.horaInicio,
            duracion: clase.duracion,
            curso: clase.curso
          });
    }
  }
}