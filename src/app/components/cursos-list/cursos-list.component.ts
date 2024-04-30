
// @Component({
//   selector: 'app-cursos-list',
//   templateUrl: './cursos-list.component.html',
//   styleUrls: ['./cursos-list.component.scss']
// })
// export class CursosListComponent implements OnInit {
//   cursos$: Observable<Curso[]>;

//   constructor(private cursoService: CursoService) {}

//   ngOnInit(): void {
//     this.cursos$ = this.cursoService.getCursos();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-list',
  templateUrl: './cursos-list.component.html',
  styleUrls: ['./cursos-list.component.scss']
})
export class CursosListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'costo', 'acciones'];
  dataSource = new MatTableDataSource<Curso>();

  constructor(private cursoService: CursoService, private router: Router) { }

  ngOnInit() {
    this.cursoService.getCursos().subscribe(cursos => {
      this.dataSource.data = cursos;
    });
  }

  deleteCurso(id: number) {
    this.cursoService.deleteCurso(id);
  }

  editCurso(id: number) {
    this.router.navigate(['/cursos/edit', id]);
  }
}