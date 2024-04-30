import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes Personalizados
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosABMComponent } from './components/alumnos-abm/alumnos-abm.component';
import { CursosListComponent } from './components/cursos-list/cursos-list.component';
import { CursosABMComponent } from './components/cursos-abm/cursos-abm.component';
import { ClasesListComponent } from './components/clases-list/clases-list.component';
import { ClasesABMComponent } from './components/clases-abm/clases-abm.component';

//Pipes y Directivas personalizadas
import { FullNamePipe } from './pipes/full-name.pipe';
import { FontSizeDirective } from './directives/font-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AlumnosListComponent,
    AlumnosABMComponent,
    CursosListComponent,
    CursosABMComponent,
    ClasesListComponent,
    ClasesABMComponent,
    FontSizeDirective,
    FullNamePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }