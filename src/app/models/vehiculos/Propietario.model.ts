import { Vehiculo } from "./Vehiculo.model";

export interface Propietario {
  id:number;
  rut: string;
  nombres: string;
  direccion: string;
  correo: string;
  correoAlt: string;
  telefono: string;
  telefonoAlt: string;
  vehiculos: Vehiculo[];
}
