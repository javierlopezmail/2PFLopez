import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Clase } from '../../models/clase';
import { Router } from '@angular/router';
import { ClaseService } from '../../services/clase.service';

@Component({
    selector: 'app-clases-list',
    templateUrl: './clases-list.component.html',
    styleUrls: ['./clases-list.component.scss']
  })
export class ClasesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'horaInicio', 'duracion', 'curso', 'acciones'];
  dataSource = new MatTableDataSource<Clase>();

  constructor(private claseService: ClaseService, private router: Router) { }

  ngOnInit() {
    this.claseService.getClases().subscribe(cursos => {
      this.dataSource.data = cursos;
    });
  }

  deleteClase(id: number) {
    this.claseService.deleteClase(id);
  }

  editClase(id: number) {
    this.router.navigate(['/clases/edit', id]);
  }
}