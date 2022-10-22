import { Campo } from "../misc/Campo.model";

export interface SiniestroGestionPayload {
  estadoId: Campo;
  probabilidad: Campo;
  companiaTercero: Campo;
  numeroTercero: Campo;
  fechaPromesa: Campo;
  monto: Campo;
  telefono: Campo;
  fechaCarta: Campo;
  montoSolicitado: Campo;
  estudioAbogados: Campo;
}
