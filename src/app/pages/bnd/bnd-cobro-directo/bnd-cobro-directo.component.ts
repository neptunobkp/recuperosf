import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  EventEmitter,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { SiniestrosService } from "src/app/siniestros.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Siniestro, SiniestroMono } from "src/app/models/Siniestro";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";
import { MatDialog } from "@angular/material/dialog";
import { BndAsignacionComponent } from "../bnd-asignacion/bnd-asignacion.component";
import { FormBuilder } from "@angular/forms";
import { Task } from "src/app/models/task.model";
import { EtapasService } from "src/app/etapas.service";
import { ItemLista } from "src/app/models/ItemLista";
import * as saveAs from "file-saver";
import { DialogoConEjecutivoComponent } from 'src/app/shared/dialogo-con-ejecutivo/dialogo-con-ejecutivo.component';
import { TotalBandeja } from "src/app/models/siniestros/TotalBandeja.model";

@Component({
  selector: "app-bnd-cobro-directo",
  templateUrl: "./bnd-cobro-directo.component.html",
  styleUrls: ["./bnd-cobro-directo.component.scss"],
})
export class BndCobroDirectoComponent implements AfterViewInit {
  etapa: string = "Cobro directo";
  etapaId: number = 21;
  currentUser: User;
  filtraje: EventEmitter<number> = new EventEmitter<number>();
  estados: Task[];
  ejecutivos: any[];
  editarForm: any;
  totales: TotalBandeja;
  probabilidades = [
    { valor: "1", texto: "Baja" },
    { valor: "2", texto: "Media" },
    { valor: "3", texto: "Alta" },
  ];
  generandoExcel: boolean = false;
  minDate: Date;
  maxDate: Date;
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
    "ejecutivoNombres",
    "diasGestion",
    "alertaGestion",
    "probabilidad",
    "fechaAsignacion",
    "tipoDanio",
    "aceptado",
    "prescripcion",
    "gestion",
    "certificacion",
  ];

  data: Siniestro[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: SiniestrosService,
    private etapasService: EtapasService,
    private route: ActivatedRoute,
    private router: Router,

    private authenticationService: AutenticacionService,
    public dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });

    this.editarForm = this.formBuilder.group({
      numeroSiniestro: [""],
      compania: [""],
      fechaDesde: [""],
      fechaHasta: [""],
      estadoId: [""],
      probabilidad: [""],
      innerNumeroSiniestro: [""],
      ejecutivoId: [""],
    });
  }
  reload() {
    this.editarForm.patchValue({
      numeroSiniestro: "",
      compania: "",
      fechaDesde: "",
      fechaHasta: "",
      estadoId: "",
      probabilidad: "",
      innerNumeroSiniestro: "",
      ejecutivoId: "",
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
      .exportarSiniestrosMono(
        "",
        this.paginator.pageSize,
        this.paginator.pageIndex,
        this.etapaId,
        this.currentUser.id,
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

  ngAfterViewInit() {
    this.etapasService
      .getTasks(this.etapaId.toString())
      .subscribe((tasks: Task[]) => {
        this.estados = tasks;
      });

    this.taskService
      .getUsuarios("CobroDirecto")
      .subscribe((result: ItemLista[]) => {
        this.ejecutivos = result;
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

  abrirModalAsignacion(element, event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(BndAsignacionComponent, {
      width: "450px",
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.ejecutivo) {
        this.taskService
          .asignar(element.id, result.ejecutivo, this.currentUser.id)
          .subscribe((rest) => {
            this.filtraje.emit(1);
          });
      }
    });
  }

  ocultarId(id) {
    return btoa(id);
  }
}
