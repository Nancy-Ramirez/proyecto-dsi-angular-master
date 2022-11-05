import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoComponent } from './cargo/cargo.component';
import { FormCargoComponent } from './cargo/form-cargo.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { FormDepartamentoComponent } from './departamento/form-departamento.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormEmpleadoComponent } from './empleado/form-empleado.component';
import { FormHabitacionComponent } from './reserva/form-habitacion.component';
import { HabitacionComponent } from './reserva/habitacion.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { FormReservaComponent } from './reserva/form-reserva.component';
import { FormServicioComponent } from './reserva/form-servicio.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ServicioComponent } from './reserva/servicio.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FormUsersComponent } from './users/form-users.component';
import { UsersComponent } from './users/users.component';
import { VerHabitacionComponent } from './reserva/ver-habitacion.component';
import { ReportesComponent } from './reportes/reportes.component';


const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'empleados', component: EmpleadoComponent,canActivate: [AuthGuard] },
  { path: 'empleados/form', component: FormEmpleadoComponent,canActivate: [AuthGuard]  },
  { path: 'empleados/form/:id', component: FormEmpleadoComponent,canActivate: [AuthGuard]  },
  { path: 'habitaciones', component: HabitacionComponent,canActivate: [AuthGuard] },
  { path: 'habitaciones/form', component: FormHabitacionComponent,canActivate: [AuthGuard] },
  { path: 'habitaciones/form/:id', component: FormHabitacionComponent ,canActivate: [AuthGuard] },
  { path: 'departamentos', component: DepartamentoComponent,canActivate: [AuthGuard]  },
  { path: 'departamentos/form', component: FormDepartamentoComponent,canActivate: [AuthGuard] },
  { path: 'departamentos/form/:id', component: FormDepartamentoComponent,canActivate: [AuthGuard]  },
  { path: 'cargos', component: CargoComponent,canActivate: [AuthGuard]  },
  { path: 'cargos/form', component: FormCargoComponent,canActivate: [AuthGuard]  },
  { path: 'cargos/form/:id', component: FormCargoComponent,canActivate: [AuthGuard]  },
  { path: 'servicios', component: ServicioComponent,canActivate: [AuthGuard] },
  { path: 'servicios/form', component: FormServicioComponent,canActivate: [AuthGuard] },
  { path: 'servicios/form/:id', component: FormServicioComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard] },
  { path: 'users/form', component: FormUsersComponent,canActivate: [AuthGuard] },
  { path: 'users/form/:id', component: FormUsersComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'reserva', component: ReservaComponent,canActivate: [AuthGuard] },
  { path: 'reserva/form', component: FormReservaComponent},
  { path: 'reserva/form/:id', component: FormReservaComponent,canActivate: [AuthGuard] },
  { path: 'verhabitacion/form/:id', component: VerHabitacionComponent},
  { path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
