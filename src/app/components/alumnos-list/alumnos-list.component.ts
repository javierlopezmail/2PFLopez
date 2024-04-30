import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss']
})
export class AlumnosListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'curso', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit() {
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      this.dataSource.data = alumnos;
    });
  }

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id);
  }

  editAlumno(id: number) {
    this.router.navigate(['/alumnos/edit', id]);
  }
}