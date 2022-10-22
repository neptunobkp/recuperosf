export interface ItemTercero {
  id: number;
  rut: string;
  nombres: string;
  telefono: string;
  alias: string;
  direccion: string;
  vehiculoAnio: string;
  vehiculoColor: string;
  vehiculoMarca: string;
  vehiculoModelo: string;
  vehiculoNumeroChasis: string;
  vehiculoNumeroMotor: string;
  vehiculoPatente: string;
  clasificacionDesc: string;
  culpabilidadDesc: string;

  direcciones: ItemTercero[];
  telefonos: ItemTercero[];
  correos: ItemTercero[];
}

export interface TerceroDireccion {
  calle: string;
  numero: string;
  region: string;
  comuna: string;
  referencia: string;
}
export interface TerceroTelefono{
  codigoPais: string;
  codigoArea: string;
  numero: string;
}

export interface TerceroCorreo{
  correo: string;
}