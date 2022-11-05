export class Habitacion {
  id?: number;
  tipo_habitacion?: string;
  descripcion_habitacion?: string;
  capacidad?: number; 
  numero_habitacion?: number;
  precio?: number;
  numero_piso?: number;
  estado_habitacion?: boolean;
  imagen_habitacion?: string|null|undefined;
  caracteristica?: number[];
  fecha_disponibilidad?: Date;
  hora_disponibilidad?: number;
}
