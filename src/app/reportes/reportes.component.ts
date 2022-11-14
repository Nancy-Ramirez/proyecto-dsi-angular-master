import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado/empleado';
import { Habitacion } from '../reserva/habitacion';
import { Reserva } from '../reserva/reserva';
import { ReporteService } from './reporte.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  habitaciones!: Habitacion[];
  reservaciones!: Reserva[];
  empleados!: Empleado[];
  cargos!: any[];
  departamentos!: any[];


  constructor(public ReporteService: ReporteService) {
    // this.downloadPDF();
  }

  ngOnInit(): void {
    this.ReporteService.getHabitaciones().subscribe(
      (e) => ((this.habitaciones = e), console.log(e))
    );
    this.ReporteService.getReservas().subscribe(
      (e) => ((this.reservaciones = e), console.log(e))
    );
    this.ReporteService.getEmpleados().subscribe(
      (e) => ((this.empleados = e), console.log(e))
    );
    this.ReporteService.getCargos().subscribe(
      (e) => ((this.cargos = e), console.log(e))
    );
    this.ReporteService.getDepartamentos().subscribe(
      (e) => ((this.departamentos = e), console.log(e))
    );
  }

  obtenerEmpleado() {
    var results = [];
    for (var i = 0; i < this.empleados.length; i++) {
      for (var j = 0; j < this.departamentos.length; j++) {
        if (this.empleados[i].id_departamento === this.departamentos[j].id) {
          for (var k = 0; k < this.cargos.length; k++) {
            if (this.empleados[i].id_cargo === this.cargos[k].id) {
              results.push({
                id: this.empleados[i].id,
                nombres: this.empleados[i].nombres,
                apellidos: this.empleados[i].apellidos,
                fecha_nacimiento: this.empleados[i].fecha_nacimiento,
                nacionalidad: this.empleados[i].nacionalidad,
                dui: this.empleados[i].dui,
                isss: this.empleados[i].isss,
                nup: this.empleados[i].nup,
                direccion: this.empleados[i].direccion,
                ciudad: this.empleados[i].ciudad,
                telefono: this.empleados[i].telefono,
                sexo: this.empleados[i].sexo,
                email: this.empleados[i].email,
                fecha_contratacion: this.empleados[i].fecha_contratacion,
                nombre_departamento: this.departamentos[j].nombre_departamento,
                nombre_cargo: this.cargos[k].nombre_cargo,
              });
            }
          }
        }
      }
      // console.log(results);
    }
    return results;
  }

  createPdfEmpleado() {
    const documentDefinition: any = {
      content: [
        { text: 'HOTEL MARBELLA', style: 'header', fontSize: 30, margin: [0, 20, 0, 8],  alignment: 'center', color:'#082468'},
        { text: 'Reporte de Empleados', style: 'subheader', fontSize: 15, margin: [0,10, 0, 5], alignment: 'center'},
        {
          style: 'tableExample',
          table: { 	heights: 40,
            body: [
              [
                { text: 'Nombre', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center' },
                { text: 'Apellido', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10],  alignment: 'center' },
                { text: 'Cargo', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10],  alignment: 'center'  },
                { text: 'Departamento',fillColor: '#386ca0',color: '#FFFFFF', margin: [20, 10, 20, 10],  alignment: 'center' },
                { text: 'Fecha de Contratación',fillColor: '#386ca0',color: '#FFFFFF', margin: [20, 5, 20, 5],  alignment: 'center' },
              ],
              ...this.obtenerEmpleado().map((e) => {
                return [
                  e.nombres,
                  e.apellidos,
                  e.nombre_cargo,
                  e.nombre_departamento,
                  e.fecha_contratacion
                ];
              }),
            ],
          },
          layout: 'lightHorizontalLines', alignment: 'center'
        },
      ],
      styles: [
        {
          header: {
            fontSize: 80,
            bold: true,
            color: 'blue',
            alignment: 'right',
            margin: [0, 190, 0, 80],
          },
          subheader: {
            fontSize: 14,
          },
          superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15,
          },
          tableExample: {
            fillColor: '#eee',
            margin: [0, 5, 0, 15],
            alignment: 'center',
          },
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
    // const pdf = pdfMake.createPdf(documentDefinition);
    // pdf.open();
  }

  createPdfHabitaciones() {
    const documentDefinition: any = {
      content: [
        { text: 'HOTEL MARBELLA', style: 'header', fontSize: 30, margin: [0, 20, 0, 8],  alignment: 'center', color:'#082468'},
        { text: 'Reporte de Habitaciones', style: 'subheader', fontSize: 15, margin: [0,10, 0, 5], alignment: 'center'},
        {
          table: { heights: 40,
            body: [
              [
                { text: 'Numero Habitación', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center'},
                { text: 'Descripción', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center' },
                { text: 'Precio $', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center'},
                { text: 'Capacidad', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center' },
              ],
              ...this.habitaciones.map((e) => {
                return [
                  e.numero_habitacion,
                  e.descripcion_habitacion,
                  e.precio,
                  e.capacidad,
                ];
              }),
            ],
          },
          layout: 'lightHorizontalLines', alignment: 'center'
        },
      ],
      styles: [
        {
          header: {
            fontSize: 50,
            bold: true,
            color: 'blue',
            alignment: 'right',
            margin: [0, 190, 0, 80],
          },
          subheader: {
            fontSize: 14,
          },
          superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15,
          },
          tableExample: {
            fillColor: '#eee',
            margin: [0, 5, 0, 15],
          },
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
    // const pdf = pdfMake.createPdf(documentDefinition);
    // pdf.open();
  }

  createPdfReservas() {
    const documentDefinition: any = {
      content: [
        { text: 'HOTEL MARBELLA', style: 'header', fontSize: 30, margin: [0, 20, 0, 8],  alignment: 'center', color:'#082468'},
        { text: 'Reporte de Reservas', style: 'subheader', fontSize: 15, margin: [0,10, 0, 5], alignment: 'center'},
        {
          style: 'tableExample',
          table: { heights: 40,
            body: [
              [
                { text: 'Numero Habitación', fillColor: '#386ca0', color: '#FFFFFF', margin: [5, 10, 5, 10], alignment: 'center'},
                { text: 'Fecha de entrada', fillColor: '#386ca0', color: '#FFFFFF', margin: [5, 10, 5, 10], alignment: 'center'},
                { text: 'Fecha de salida', fillColor: '#386ca0', color: '#FFFFFF', margin: [5, 10, 5, 10], alignment: 'center'},
                { text: 'Cliente', fillColor: '#386ca0', color: '#FFFFFF', margin: [20, 10, 20, 10], alignment: 'center'},
                { text: 'Contacto', fillColor: '#386ca0', color: '#FFFFFF', margin: [5, 10, 5, 10], alignment: 'center'},
              ],
              ...this.reservaciones.map((e) => {
                return [
                  e.id_habitacion,
                  e.fecha_ingreso,
                  e.fecha_salida,
                  e.nombre_completo,
                  e.numero_contacto
                ];
              }),
            ],
          }, 
          layout: 'lightHorizontalLines', alignment: 'center'
        },
      ],
      styles: [
        {
          header: {
            fontSize: 50,
            bold: true,
            color: 'blue',
            alignment: 'right',
            margin: [0, 190, 0, 80],
          },
          subheader: {
            fontSize: 14,
          },
          superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15,
          },
          tableExample: {
            fillColor: '#eee',
            margin: [0, 5, 0, 15],
          },
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
    // const pdf = pdfMake.createPdf(documentDefinition);
    // pdf.open();
  }
}
