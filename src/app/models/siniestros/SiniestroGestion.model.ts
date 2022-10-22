import { ItemsLista } from "../ItemLista";

export interface SiniestroGestion {
  numero: string;
  compania: string;
  ejecutivoNombres: string;
  probabilidad: string;
  probabilidadDesc: string;
  estadoId: number;
  estadoNombre: string;
  estadosTransicion: ItemsLista[];
  permisos: any;
  ejecutivoId: number;
  companiaTercero: string;
  telefono: string;
  numeroTercero: number;
  montoSolicitado: number;
  monto: number;
  fechaPromesa: Date;
  fechaCarta: Date;
  estudioAbogados: string;
  pendienteVisado: boolean;
}
