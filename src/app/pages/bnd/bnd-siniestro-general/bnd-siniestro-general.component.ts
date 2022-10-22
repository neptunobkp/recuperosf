import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SiniestrosService } from "src/app/siniestros.service";
import { SiniestroEstado } from "src/app/models/SiniestroEstado";
import { DetalleSiniestro } from "src/app/models/DetalleSiniestro";
import { LineaRelato } from "src/app/models/LineaRelato";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: "app-bnd-siniestro-general",
  templateUrl: "./bnd-siniestro-general.component.html",
  styleUrls: ["./bnd-siniestro-general.component.scss"],
})
export class BndSiniestroGeneralComponent implements OnInit {
  @Input() siniestroId: string;
  isLoadingResults = false;
  isRateLimitReached = false;
  detalleListo = false;
  relatoListo = false;
  aseguradoListo = false;
  conductorListo = false;
  denuncianteListo = false;
  liquidadorListo = false;
  constanciaListo = false;
  accidenteListo = false;
  vehiculoListo = false;
  propietarioListo = false;

  vmAsegurado: any;
  vmConductor: any;
  vmConductores: any;
  vmPropietario: any;
  vmConstancia: any;
  vmDenunciante: any;
  vmLiquidador: any;
  vmAccidente: any;
  vmVehiculo: any;
  vmEjecutivo: string;
  vmEstado: string;
  vmProbabilidad: string;
  vmDetalle: SiniestroEstado;
  dataEstaLista = false;
  vmRelato: string = "";
  constructor(
    private route: ActivatedRoute,
    private taskService: SiniestrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  rescataPatente(patente1, patente2) {
    if (!patente1 || patente1.includes("ET0000")) return patente2;
    return patente1;
  }

  crearFecha(dia,mes,anio)
  {
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    if(anio > 0)
    return `${dia}-${zeroPad(mes,2)}-${anio.toString().substr(-2)}`;
    return '';
  }

  

  calculaDv(rutVal) {
    if (!rutVal) return "";
    var rut = parseInt(rutVal);
    var M = 0,
      S = 1;
    for (; rut; rut = Math.floor(rut / 10))
      S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;

    var dv = S ? S - 1 : "k";
    return rutVal + "-" + dv;
  }

  private reloadData() {
    this.isLoadingResults = true;
    this.taskService
      .getSiniestro(this.siniestroId)
      .subscribe((siniestro: SiniestroEstado) => {
        this.vmDetalle = siniestro;
        console.log('vmdet' , siniestro);
        this.detalleListo = true;
      });

    this.taskService.getAsegurado(this.siniestroId).subscribe((asegurado) => {
      this.vmAsegurado = asegurado;
      this.aseguradoListo = true;
    });
    this.taskService.getConductor(this.siniestroId).subscribe((conductor) => {
      this.vmConductor = conductor;
      this.conductorListo = true;
    });

    this.taskService.getConductores(this.siniestroId).subscribe((conductor) => {
      this.vmConductores = conductor;
    });

    this.taskService.getConstancia(this.siniestroId).subscribe((constancia) => {
      this.vmConstancia = constancia;
      this.constanciaListo = true;
    });
    this.taskService
      .getDenunciante(this.siniestroId)
      .subscribe((denunciante) => {
        this.vmDenunciante = denunciante;
        this.denuncianteListo = this.denuncianteListo;
      });
    this.taskService.getLiquidador(this.siniestroId).subscribe((liquidador) => {
      this.vmLiquidador = liquidador;
      this.liquidadorListo = true;
    });
    this.taskService.getAccidente(this.siniestroId).subscribe((accidente) => {
      this.vmAccidente = accidente;
      this.accidenteListo = true;
    });
    this.taskService.getVehiculo(this.siniestroId).subscribe((vehiculo) => {
      this.vmVehiculo = vehiculo;
      this.vehiculoListo = true;
    });
    this.taskService
      .getPropietario(this.siniestroId)
      .subscribe((propeitario) => {
        this.vmPropietario = propeitario;
        this.propietarioListo = true;
      });

    this.taskService
      .getRelato(this.siniestroId)
      .subscribe((relatos: LineaRelato[]) => {
        relatos.forEach((relato) => {
          this.vmRelato = this.vmRelato + relato.Texto.trim() + " ";
        });
        this.relatoListo = true;
      });
  }
}
