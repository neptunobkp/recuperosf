import { List } from "./list.model";

export interface SiniestroEstado {
  id: number;
  numero: number;
  compania: string;
  estadosTransicion: List[];
  probabilidad: string;
  estadoNombre: string;
  ejecutivoNombres: string;
  probabilidadDesc: string;
  numeroPoliza: string;
  fechaSiniestro: Date;
  fechaDenuncio: Date;
  causal: string;
  companiaTercero: string;
  estudioAbogados: string;
  pendienteVisado: boolean;
  riesgo:string;
}
