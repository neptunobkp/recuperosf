import { Component, OnInit, Input } from "@angular/core";
import { SiniestrosService } from "src/app/siniestros.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SiniestroEstado } from "src/app/models/SiniestroEstado";

@Component({
  selector: "app-bnd-siniestro-bitacora",
  templateUrl: "./bnd-siniestro-bitacora.component.html",
  styleUrls: ["./bnd-siniestro-bitacora.component.scss"],
})
export class BndSiniestroBitacoraComponent implements OnInit {
  @Input() siniestroId: string;
  vmEjecutivo: string;
  vmEstado: string;
  vmProbabilidad: string;
  vmNumeroSiniestro: number;
  isLoadingResults = false;
  isRateLimitReached = false;
  constructor(
    private route: ActivatedRoute,
    private taskService: SiniestrosService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }

  private reloadData() {
    this.isLoadingResults = true;
    this.taskService
      .getSiniestro(this.siniestroId)
      .subscribe((siniestro: SiniestroEstado) => {
        const objResult = {
          id: siniestro.id,
          estadoId: "",
          probabilidad: siniestro.probabilidad.toString(),
        };
        this.vmEjecutivo = siniestro.ejecutivoNombres;
        this.vmProbabilidad = siniestro.probabilidadDesc;
        this.vmEstado = siniestro.estadoNombre;
        this.vmNumeroSiniestro = siniestro.numero;
        this.isLoadingResults = false;
      });
  }
}
