import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormEmpleadoComponent } from './empleado/form-empleado.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FormHabitacionComponent } from './reserva/form-habitacion.component';
import { HabitacionComponent } from './reserva/habitacion.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { CargoComponent } from './cargo/cargo.component';
import { FormDepartamentoComponent } from './departamento/form-departamento.component';
import { FormCargoComponent } from './cargo/form-cargo.component';
import { InicioComponent } from './inicio/inicio.component';
import { BusCargoPipe } from './pipes/bus-cargo.pipe';
import { BusHabitacionPipe } from './pipes/bus-habitacion.pipe';
import { BusDepartamentoPipe } from './pipes/bus-departamento.pipe';
import { ServicioComponent } from './reserva/servicio.component';
import { BusServicioPipe} from './pipes/bus-servicio.pipe';
import { FormServicioComponent } from './reserva/form-servicio.component';
import { UsersComponent } from './users/users.component';
import { FormUsersComponent } from './users/form-users.component';
import { BusUsersPipe } from './pipes/bus-users.pipe';
import { LoginComponent } from './login/login.component';
import { NgxMaskModule} from 'ngx-mask';
import { ReservaComponent } from './reserva/reserva.component'
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormReservaComponent } from './reserva/form-reserva.component';
import { BusReservaPipe } from './pipes/bus-reserva.pipe';
import { VerHabitacionComponent } from './reserva/ver-habitacion.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ReportesComponent } from './reportes/reportes.component'

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    FormEmpleadoComponent,
    FilterPipe,
    FormHabitacionComponent,
    HabitacionComponent,
    DepartamentoComponent,
    CargoComponent,
    FormDepartamentoComponent,
    FormCargoComponent,
    InicioComponent,
    BusCargoPipe,
    BusHabitacionPipe,
    BusDepartamentoPipe,
    BarraLateralComponent,
    ServicioComponent,
    BusServicioPipe,
    FormServicioComponent,
    UsersComponent,
    FormUsersComponent,
    BusUsersPipe,
    LoginComponent,
    ReservaComponent,
    BusReservaPipe,
    FormReservaComponent,
    VerHabitacionComponent,
    ReportesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

