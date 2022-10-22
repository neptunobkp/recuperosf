import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  SiniestroResponse,
  SiniestroMonoResponse,
} from "./models/SiniestroResponse";
import { Observable } from "rxjs";
import { WebRequestService } from "./web-request.service";
import { environment } from "src/environments/environment";
import { EntradaResponse } from "./models/EntradaResponse";
import { PaginaTercero } from "./models/paginaTercero";
import { SiniestroAdjunto } from "./models/siniestros/SiniestroAdjunto.model";

@Injectable({
  providedIn: "root",
})
export class SiniestrosService {
  readonly ROOT_URL;

  constructor(
    private http: HttpClient,
    private webReqService: WebRequestService
  ) {
    this.ROOT_URL = environment.apiUrl;
  }

  consultaAsignacion(numero: string)
  {
    return this.webReqService.get(`siniestro/consulta-asignacion?numero=${numero}`);
  }

  getAsegurado(numero: string) {
    return this.webReqService.get(`recup02/${numero}/asegurado`);
  }
  getConductor(numero: string) {
    return this.webReqService.get(`recup02/${numero}/conductor`);
  }
  getConductores(numero: string) {
    return this.webReqService.get(`recup02/${numero}/conductores`);
  }
  getConstancia(numero: string) {
    return this.webReqService.get(`recup02/${numero}/constancia`);
  }
  getDenunciante(numero: string) {
    return this.webReqService.get(`recup02/${numero}/denunciante`);
  }
  getLiquidador(numero: string) {
    return this.webReqService.get(`recup02/${numero}/liquidador`);
  }
  getRelato(numero: string) {
    return this.webReqService.get(`recup02/${numero}/relato`);
  }
  getAccidente(numero: string) {
    return this.webReqService.get(`recup02/${numero}/accidente`);
  }
  getVehiculo(numero: string) {
    return this.webReqService.get(`recup02/${numero}/vehiculo`);
  }
  getPropietario(numero: string) {
    return this.webReqService.get(`recup02/${numero}/propietario`);
  }

  getFacturas(numero: string) {
    return this.webReqService.get(`recup02/${numero}/facturas`);
  }

  getTiposOservacion() {
    return this.webReqService.get(`/TiposObservacion`);
  }

  getBitacora(
    orden: string,
    tamano: number,
    pagina: number,
    numero: string
  ): Observable<EntradaResponse> {
    return this.http.post<EntradaResponse>(
      this.ROOT_URL + `/EntradasBitacora`,
      {
        numero: numero,
        Pagina: pagina,
        ItemsPorPagina: tamano,
      }
    );
  }

  getAdjuntos(numero: string): Observable<SiniestroAdjunto[]> {
    return this.http.get<SiniestroAdjunto[]>(
      this.ROOT_URL + `/siniestros/${numero}/Adjuntos/listar`
    );
  }

  descargarAdjunto(id) {
    return this.http.get(
      this.ROOT_URL + `/siniestros/1/Adjuntos/descargar?archivoId=${id}`,
      {
        responseType: "blob",
      }
    );
  }

  eliminarAdjunto(id) {
    return this.webReqService.delete(
      `/siniestros/1/Adjuntos/eliminar?archivoId=${id}`
    );
  }

  getTerceros(
    siniestroId: string,
    tamano: number,
    pagina: number
  ): Observable<PaginaTercero> {
    return this.http.post<PaginaTercero>(
      this.ROOT_URL + `/siniestros/${siniestroId}/terceros/listar`,
      {
        Pagina: pagina,
        ItemsPorPagina: tamano,
      }
    );
  }

  obtenerTercero(id) {
    return this.http.get(this.ROOT_URL + `/siniestros/1/terceros/${id}`);
  }

  agregarTercero(siniestroId: string, payload) {
    return this.http.post(
      this.ROOT_URL + `/siniestros/${siniestroId}/terceros/crear`,
      payload
    );
  }

  editarTercero(payload) {
    return this.http.put(
      this.ROOT_URL + `/siniestros/1/terceros/editar`,
      payload
    );
  }

  eliminarTercero(id) {
    return this.http.delete(this.ROOT_URL + `/siniestros/1/terceros/${id}`);
  }

  guardarObservacion(payload: any, siniestroId: any) {
    return this.http.post(
      this.ROOT_URL + `/siniestros/${siniestroId}/EntradasObservacion/crear`,
      payload
    );
  }

  getObservaciones(
    orden: string,
    tamano: number,
    pagina: number,
    numero: string
  ): Observable<EntradaResponse> {
    return this.http.post<EntradaResponse>(
      this.ROOT_URL + `/siniestros/${numero}/EntradasObservacion/filtrar`,
      {
        Pagina: pagina,
        ItemsPorPagina: tamano,
      }
    );
  }

  exportarSiniestros(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<any> {
    return this.http.post(
      this.ROOT_URL + `/MultiUsuarios/Exportar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        filtros: filtros,
      },
      { responseType: "blob" }
    );
  }

  exportarSiniestrosVisables(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<any> {
    return this.http.post(
      this.ROOT_URL + `/Visables/Exportar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        filtros: filtros,
      },
      { responseType: "blob" }
    );
  }

  exportarSiniestrosMono(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    ejecutivoId: number,
    filtros: any
  ): Observable<any> {
    return this.http.post(
      this.ROOT_URL + `/MonoUsuarios/Exportar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        ejecutivoId: ejecutivoId,
        filtros: filtros,
      },
      { responseType: "blob" }
    );
  }

  getSiniestros(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<SiniestroResponse> {
    return this.http.post<SiniestroResponse>(
      this.ROOT_URL + `/MultiUsuarios/Filtrar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        filtros: filtros,
      }
    );
  }

  getSiniestrosBandeja(
    orden: any,
    direccion: any,
    itemsPorPagina: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<SiniestroResponse> {
    return this.http.post<SiniestroResponse>(
      this.ROOT_URL + `/SiniestrosBandeja/Filtrar`,
      {
        orden,
        direccion,
        etapaId,
        pagina,
        itemsPorPagina,
        filtros,
      }
    );
  }

  getSiniestrosVisables(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<SiniestroResponse> {
    return this.http.post<SiniestroResponse>(
      this.ROOT_URL + `/Visables/Filtrar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        filtros: filtros,
      }
    );
  }

  getSiniestrosMulti(
    orden: any,
    direccion: any,
    ItemsPorPagina: number,
    pagina: number,
    etapaId: number,
    filtros: any
  ): Observable<SiniestroResponse> {
    return this.http.post<SiniestroResponse>(
      this.ROOT_URL + `/MultiUsuarios/Filtrar`,
      {
        orden,
        direccion,
        etapaId,
        pagina,
        ItemsPorPagina,
        filtros,
      }
    );
  }

  getSiniestrosMono(
    orden: string,
    tamano: number,
    pagina: number,
    etapaId: number,
    ejecutivoId: number,
    filtros: any
  ): Observable<SiniestroMonoResponse> {
    return this.http.post<SiniestroMonoResponse>(
      this.ROOT_URL + `/MonoUsuarios/Filtrar`,
      {
        EtapaId: etapaId,
        Pagina: pagina,
        ItemsPorPagina: tamano,
        ejecutivoId: ejecutivoId,
        filtros: filtros,
      }
    );
  }

  getSiniestro(siniestroId: string) {
    return this.webReqService.get(`siniestros/${siniestroId}`);
  }

  cambiarEstado(id: string, payload: any) {
    return this.webReqService.patch(
      `siniestros/${id}/gestion/guardar`,
      payload
    );
  }

  asignar(siniestroId: string, ejectuvoId: string, ownerId: number) {
    return this.webReqService.patch(`siniestros/${siniestroId}/Asignar`, {
      ejecutivoId: parseInt(ejectuvoId),
      ownerId: ownerId,
    });
  }

  visarAceptar(siniestroId: string) {
    return this.webReqService.patch(
      `siniestros/${siniestroId}/VisarAceptar`,
      null
    );
  }

  visarRechazar(siniestroId: string, motivo: any) {
    return this.webReqService.patch(`siniestros/${siniestroId}/VisarRechazar`, {
      detalle: motivo.detalle,
    });
  }

  getUsuarios(rol: string) {
    return this.webReqService.get(`usuarios?perfil=${rol}`);
  }

  buscarVehiculo(patente: string) {
    return this.webReqService.get(`vehiculos?patente=${patente}`);
  }

  buscarPersona(rut: number) {
    return this.webReqService.get(`propietarios?rut=${rut}`);
  }

  comprarDatosVehiculo(patente: string, siniestroId: string) {
    return this.webReqService.get(
      `equifax/buscarPatente?patente=${patente}&siniestroId=${siniestroId}`
    );
  }

  comprarDatosPersona(rut: number, siniestroId: string) {
    return this.webReqService.get(
      `equifax/buscarRut?rut=${rut}&siniestroId=${siniestroId}`
    );
  }

  getSiniestroDocumento(id: string) {
    return this.webReqService.get(`/SiniestroDocumento?id=${id}`);
  }

  getSiniestroCabeceraa(id: string) {
    return this.webReqService.get(`/siniestrocabecera/${id}`);
  }

  getSiniestroGestion(id: string) {
    return this.webReqService.get(`siniestros/${id}/gestion/inicio`);
  }

  getPermisosPorEstado(id: string, estadoId: number) {
    return this.webReqService.get(
      `siniestros/${id}/gestion/permisosParaEstado/${estadoId}`
    );
  }
}
