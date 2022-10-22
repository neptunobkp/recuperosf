import { Component, OnInit, Input } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-bnd-pestanas",
  templateUrl: "./bnd-pestanas.component.html",
  styleUrls: ["./bnd-pestanas.component.scss"],
})
export class BndPestanasComponent implements OnInit {
  currentUser: User;
  links: any[];
  activeLink: string;
  @Input() indice: string;
  constructor(private authenticationService: AutenticacionService) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (this.currentUser && this.currentUser.rol) {
        if (this.currentUser.rol == "Analista") {
          this.links = [
            { codigo: "analisis", descripcion: "Análisis" },
            { codigo: "datosTercero", descripcion: "Datos Tercero" },
            { codigo: "cobroDirecto", descripcion: "Cobro Directo" },
            {
              codigo: "prejudicialInterno",
              descripcion: "Prejudicial Interno",
            },
            {
              codigo: "asignacionJudicial",
              descripcion: "Asignación Judicial",
            },
            { codigo: "certificacion", descripcion: "Certificación" },
            { codigo: "noAplica", descripcion: "No Aplica" },
            { codigo: "consultaSiniestros", descripcion: "Consulta Siniestro" },
          ];
        }

        if (this.currentUser.rol == "CobroDirecto") {
          this.links = [
            { codigo: "cobroDirecto", descripcion: "Cobro Directo" },
          ];
        }

        if (this.currentUser.rol == "PrejudicialInterno") {
          this.links = [
            {
              codigo: "prejudicialInterno",
              descripcion: "Prejudicial Interno",
            },
            { codigo: "esudiosJuridicos", descripcion: "Estudios Jurídicos" },
            { codigo: "noAplica", descripcion: "No Aplica" },
          ];
        }

        if (this.currentUser.rol == "AdmPrejudicialInter") {
          this.links = [
            {
              codigo: "prejudicialInterno",
              descripcion: "Prejudicial Interno",
            },
            { codigo: "noAplica", descripcion: "No Aplica" },
          ];
        }

        if (this.currentUser.rol == "AdmLegal") {
          this.links = [
            {
              codigo: "prejudicialInterno",
              descripcion: "Prejudicial Interno",
            },
            { codigo: "esudiosJuridicos", descripcion: "Estudios Jurídicos" },
            { codigo: "cierreEstudios", descripcion: "Cierre Estudios J." },
            { codigo: "noAplica", descripcion: "No Aplica" },
          ];
        }

        if (this.currentUser.rol == "EstudioJuridicoExter") {
          this.links = [
            { codigo: "esudiosJuridicos", descripcion: "Estudios Jurídicos" },
          ];
        }

        if (this.currentUser.rol == "Intercompania") {
          this.links = [
            { codigo: "datosTercero", descripcion: "Datos Tercero" },
            { codigo: "interCompania", descripcion: "Intercompañía" },
            { codigo: "interBciZenit", descripcion: "Intercompañía BCI/Zenit" },
            {
              codigo: "cartaIntercompania",
              descripcion: "Carta Intercompañía",
            },
            { codigo: "noAplica", descripcion: "No Aplica" },
          ];
        }

        if (this.currentUser.rol == "Supervisor") {
          this.links = [
            { codigo: "analisis", descripcion: "Análisis" },
            { codigo: "datosTercero", descripcion: "Datos Tercero" },
            { codigo: "cobroDirecto", descripcion: "Cobro Directo" },
            { codigo: "interCompania", descripcion: "Intercompañía" },
            { codigo: "interBciZenit", descripcion: "Intercompañía BCI/Zenit" },
            {
              codigo: "cartaIntercompania",
              descripcion: "Carta Intercompañía",
            },
            {
              codigo: "prejudicialInterno",
              descripcion: "Prejudicial Interno",
            },
            {
              codigo: "asignacionJudicial",
              descripcion: "Asignación Judicial",
            },
            { codigo: "esudiosJuridicos", descripcion: "Estudios Jurídicos" },
            { codigo: "cierreEstudios", descripcion: "Cierre Estudios J." },
            { codigo: "certificacion", descripcion: "Certificación" },
            { codigo: "recuperados", descripcion: "Recuperados" },
            { codigo: "noAplica", descripcion: "No Aplica" },
            { codigo: "consultaSiniestros", descripcion: "Consulta Siniestro" },
          ];
        }
      }

      // this.activeLink = this.links[0].codigo;
    });
  }

  background: ThemePalette = undefined;

  ngOnInit(): void {
    const linkSeleccionado = this.links.filter((t) => t.codigo == this.indice);
    if (linkSeleccionado && linkSeleccionado.length > 0)
      this.activeLink = linkSeleccionado[0].codigo;
  }

  toggleBackground() {
    this.background = this.background ? undefined : "primary";
  }
}
