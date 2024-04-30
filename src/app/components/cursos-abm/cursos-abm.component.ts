import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { positiveNumberValidator } from '../../validators/positive-number.validator';

@Component({
    selector: 'app-cursos-abm',
    templateUrl: './cursos-abm.component.html',
    styleUrls: ['./cursos-abm.component.scss']
  })
export class CursosABMComponent implements OnInit {
  cursosForm: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private cursoService: CursoService, private route: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) {
    this.cursosForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      costo: ['', [Validators.required, positiveNumberValidator]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cursoId = params['id'];
      if (cursoId) {
        this.loadCursoData(cursoId);
        this.editing = true;
      }
    });
  }

  onSubmit(): void {
    const cursoData: Curso = this.cursosForm.value;
    if (cursoData.id) {
      this.cursoService.updateCurso(cursoData).subscribe({
        next: () => {
          this.snackBar.open('Curso actualizado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al actualizar el curso', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.cursoService.addCurso(cursoData).subscribe({
        next: () => {
          this.snackBar.open('Curso añadido exitosamente', 'Cerrar', { duration: 3000 });
          this.clearForm();
        },
        error: () => {
          this.snackBar.open('Error al añadir el curso', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  deleteCurso(): void {
    if (this.editing && this.cursosForm.value.id) {
        this.cursoService.deleteCurso(this.cursosForm.value.id).subscribe({
            next: () => {
                this.snackBar.open('Curso eliminado exitosamente', 'Cerrar', { duration: 3000 });
                this.clearForm();
            },
            error: () => {
                this.snackBar.open('Error al eliminar el curso', 'Cerrar', { duration: 3000 });
            }
        });
    }
  }

  clearForm(): void {
    this.cursosForm.reset();
    this.editing = false;
    
    Object.keys(this.cursosForm.controls).forEach(key => {
        this.cursosForm.get(key)?.markAsPristine();
        this.cursosForm.get(key)?.markAsUntouched();
    });
  }

  cancel(): void {
    this.clearForm();
  }

  setCurso(curso: Curso): void {
    this.cursosForm.setValue(curso);
    this.editing = true;
  }

  loadCursoData(id: number) {
    const curso = this.cursoService. getCursoById(id);
    if (curso != undefined){
        this.cursosForm.setValue({
            id: curso.id,
            nombre: curso.nombre,
            costo: curso.costo
          });
    }
  }
}