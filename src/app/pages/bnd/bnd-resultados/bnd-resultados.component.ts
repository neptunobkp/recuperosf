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
import { Siniestro } from "src/app/models/Siniestro";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { FormBuilder } from "@angular/forms";
import { EtapasService } from "src/app/etapas.service";
import { Task } from "src/app/models/task.model";
import { DialogoConEjecutivoComponent } from 'src/app/shared/dialogo-con-ejecutivo/dialogo-con-ejecutivo.component';
import { TotalBandeja } from "src/app/models/siniestros/TotalBandeja.model";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: "app-bnd-resultados",
  templateUrl: "./bnd-resultados.component.html",
  styleUrls: ["./bnd-resultados.component.scss"],
})
export class BndResultadosComponent implements AfterViewInit {
  @Input() etapa: string;
  @Input() etapaId: number;
  estados: Task[];
  editarForm: any;
  totales: TotalBandeja;
  probabilidades = [
    { valor: "1", texto: "Baja" },
    { valor: "2", texto: "Media" },
    { valor: "3", texto: "Alta" },
  ];
  displayedColumns: string[] = [
    "compania",
    "numero",
    "fechaDenuncio",
    "fechaSiniestro",
    "provision",
    "gastoUF",
    "montoOR",
    "fechaAsignacion",
    "ejecutivo",
    "diasGestion",
    "alertaGestion",
    "estadoNombre",
    "probabilidad",
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
    public dialog: MatDialog
  ) {
    this.editarForm = this.formBuilder.group({
      numeroSiniestro: [""],
      compania: [""],
      fechaDesde: [""],
      fechaHasta: [""],
      estadoId: [""],
      probabilidad: [""],
      innerNumeroSiniestro: [""],
    });
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
