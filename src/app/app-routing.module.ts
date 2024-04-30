import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosABMComponent } from './components/alumnos-abm/alumnos-abm.component';
import { ClasesListComponent } from './components/clases-list/clases-list.component';
import { ClasesABMComponent } from './components/clases-abm/clases-abm.component';
import { CursosListComponent } from './components/cursos-list/cursos-list.component';
import { CursosABMComponent } from './components/cursos-abm/cursos-abm.component';

const routes: Routes = [
  { path: 'listado-alumnos', component: AlumnosListComponent },
  { path: 'alta-alumno', component: AlumnosABMComponent, data: { mode: 'create' } },
  { path: 'alumnos/edit/:id', component: AlumnosABMComponent }, 
  { path: 'modificacion-alumno', component: AlumnosABMComponent, data: { mode: 'edit' } },
  { path: 'baja-alumno', component: AlumnosABMComponent, data: { mode: 'delete' } },

  { path: 'listado-clases', component: ClasesListComponent },
  { path: 'alta-clase', component: ClasesABMComponent, data: { mode: 'create' } },
  { path: 'clases/edit/:id', component: ClasesABMComponent, data: { mode: 'edit' } },
  { path: 'modificacion-clase', component: ClasesABMComponent, data: { mode: 'edit' } },
  { path: 'baja-clase', component: ClasesABMComponent, data: { mode: 'delete' } },

  { path: 'listado-cursos', component: CursosListComponent },
  { path: 'alta-curso', component: CursosABMComponent, data: { mode: 'create' } },
  { path: 'cursos/edit/:id', component: CursosABMComponent, data: { mode: 'edit' } },
  { path: 'modificacion-curso', component: CursosABMComponent, data: { mode: 'edit' } },
  { path: 'baja-curso', component: CursosABMComponent, data: { mode: 'delete' } },

  { path: '', redirectTo: '/listado-alumnos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }