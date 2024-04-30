import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { Curso } from '../../models/curso';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-clase-abm',
  templateUrl: './clase-abm.component.html',
  styleUrls: ['./clase-abm.component.scss']
})
export class ClasesABMComponent implements OnInit {
  claseForm: FormGroup;
  cursos$: Observable<Curso[]>;
  alumnos$: Observable<Alumno[]>;
  editMode: boolean = false;  // Assumed flag to toggle edit mode, based on input or route

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.cursos$ = this.cursoService.getCursos();
    this.alumnos$ = this.alumnoService.getAlumnos();

    this.claseForm = this.fb.group({
      cursoId: ['', Validators.required],
      horaInicio: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      alumnos: [[]] // Start with an empty array for alumnos
    });

    // If in edit mode, load existing data into form
    if (this.editMode) {
      this.loadExistingData();
    }
  }

  loadExistingData(): void {
    // Logic to load existing class details into the form
    // Example: this.claseForm.patchValue({ ... });
  }

  onSubmit(): void {
    if (this.claseForm.valid) {
      const claseData = this.claseForm.value;
      console.log('Clase Data:', claseData);
      // Further logic to submit the data
    }
  }
}