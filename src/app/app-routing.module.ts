import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormEmpleadoComponent } from './empleado/form-empleado.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { FormHabitacionComponent } from './habitacion/form-habitacion.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { FormDepartamentoComponent } from './departamento/form-departamento.component';
import { CargoComponent } from './cargo/cargo.component';
import { FormCargoComponent } from './cargo/form-cargo.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'empleados', component: EmpleadoComponent },
  { path: 'empleados/form', component: FormEmpleadoComponent },
  { path: 'empleados/form/:id', component: FormEmpleadoComponent },
  { path: 'habitaciones', component: HabitacionComponent },
  { path: 'habitaciones/form', component: FormHabitacionComponent },
  { path: 'habitaciones/form/:id', component: FormHabitacionComponent },
  { path: 'departamentos', component: DepartamentoComponent },
  { path: 'departamentos/form', component: FormDepartamentoComponent },
  { path: 'departamentos/form/:id', component: FormDepartamentoComponent },
  { path: 'cargos', component: CargoComponent },
  { path: 'cargos/form', component: FormCargoComponent },
  { path: 'cargos/form/:id', component: FormCargoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
