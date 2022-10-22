import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { Task } from "src/app/models/task.model";
import { Siniestro } from "src/app/models/Siniestro";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormBuilder } from "@angular/forms";
import { SiniestrosService } from "src/app/siniestros.service";
import { EtapasService } from "src/app/etapas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { merge, Observable, of as observableOf } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import * as saveAs from "file-saver";
import { MatDialog } from "@angular/material/dialog";
import { DialogoConMotivoComponent } from "src/app/shared/dialogo-con-motivo/dialogo-con-motivo.component";
import { DialogoConEjecutivoComponent } from 'src/app/shared/dialogo-con-ejecutivo/dialogo-con-ejecutivo.component';
import { TotalBandeja } from "src/app/models/siniestros/TotalBandeja.model";

@Component({
  selector: "app-bnd-certificacion",
  templateUrl: "./bnd-certificacion.component.html",
  styleUrls: ["./bnd-certificacion.component.scss"],
})
export class BndCertificacionComponent implements AfterViewInit {
  etapa: string = "Certificación";
  etapaId: number = -2;
  estados: Task[];
  editarForm: any;
  generandoExcel: boolean = false;
  minDate: Date;
  maxDate: Date;
  totales: TotalBandeja;
  probabilidades = [
    { valor: "1", texto: "Baja" },
    { valor: "2", texto: "Media" },
    { valor: "3", texto: "Alta" },
  ];
  displayedColumns: string[] = [
    "compania",
    "numero",
    "estadoNombre",
    "tipoOrden",
    "fechaDenuncio",
    "fechaSiniestro",
    "provision",
    "gastoUF",
    "montoOR",
    "diasGestion",
    "ejecutivoNombres",
    "probabilidad",
    "fechaAsignacion",
    "tipoDanio",
    "aceptado",
    "visado",
  ];

  data: Siniestro[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filtraje: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private formBuilder: FormBuilder,
    private taskService: SiniestrosService,
    private etapasService: EtapasService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.editarForm = this.formBuilder.group({
      numeroSiniestro: [""],
      compania: [""],
      fechaDesde: [""],
      fechaHasta: [""],
      innerNumeroSiniestro: [""],
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }
  reload() {
    this.editarForm.patchValue({
      numeroSiniestro: "",
      compania: "",
      fechaDesde: "",
      fechaHasta: "",
      innerNumeroSiniestro: "",
    });
    this.filtraje.emit(1);
  }
  consulta(){
    if(this.editarForm.value.numeroSiniestro)
      this.taskService.consultaAsignacion(this.editarForm.value.numeroSiniestro ).subscribe((result : any) => {
        this.dialog.open(DialogoConEjecutivoComponent, { width: '600px', data:  result.respuesta,  });
      });
    else
      this.dialog.open(DialogoConEjecutivoComponent, { data: 'Por favor ingrese un número de siniestro'})
  }

onSaveForm() {
    if (this.editarForm.dirty && this.editarForm.valid) {
      this.paginator.firstPage();
      this.isLoadingResults = true;
      this.filtraje.emit(1);
    }
  }

  exportar() {
    this.generandoExcel = true;
    this.taskService
      .exportarSiniestros(
        "",
        this.paginator.pageSize,
        this.paginator.pageIndex,
        this.etapaId,
        this.editarForm.value
      )
      .subscribe((x) => {
        const data = new Blob([x as any], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        this.generandoExcel = false;
        saveAs(data, "Recuperos_Siniestros.xlsx");
      });
  }

  aprobar(element, event): void {
    event.stopPropagation();
    this.taskService.visarAceptar(element.id).subscribe((rest) => {
      this.filtraje.emit(1);
    });
  }

  rechazar(element, event): void {
    event.stopPropagation();
    this.dialog
      .open(DialogoConMotivoComponent, {
        data:
          "Por favor ingrese un comentario indicando el motivo del rechazo.",
        width: "600px",
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data && data.detalle) {
          this.taskService.visarRechazar(element.id, data).subscribe((rest) => {
            this.filtraje.emit(1);
          });
        }
      });
  }

  ngAfterViewInit() {
    this.etapasService
      .getTasks(this.etapaId.toString())
      .subscribe((tasks: Task[]) => {
        this.estados = tasks;
      });

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page, this.filtraje)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.taskService.getSiniestrosBandeja(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageSize,
            this.paginator.pageIndex,
            this.etapaId,
            this.editarForm.value
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
          this.totales = { total: data.total, totalGlobal: data.totalGlobal };

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  ocultarId(id) {
    return btoa(id);
  }
}
