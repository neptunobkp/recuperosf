import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { Entrada } from "src/app/models/Entrada";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SiniestrosService } from "src/app/siniestros.service";
import { ActivatedRoute, Router } from "@angular/router";
import { merge, of as observableOf } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { SiniestroAdjunto } from "src/app/models/siniestros/SiniestroAdjunto.model";
import * as saveAs from "file-saver";
import { MatDialog } from "@angular/material/dialog";
import { DialogoConfirmacionComponent } from "src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component";
import { SiniestroDocumento } from 'src/app/models/siniestros/SiniestroDocumento';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { User } from 'src/app/models/user';
@Component({
  selector: "app-bnd-tabla-adjuntos",
  templateUrl: "./bnd-tabla-adjuntos.component.html",
  styleUrls: ["./bnd-tabla-adjuntos.component.scss"],
})
export class BndTablaAdjuntosComponent implements AfterViewInit {
  @Input() siniestro: SiniestroDocumento;
  filtraje: EventEmitter<number> = new EventEmitter<number>();
  displayedColumns: string[] = [
    "nombre",
    "usuarioNombres",
    "fecha",
    "acciones",
  ];

  data: SiniestroAdjunto[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  currentUser: User;
  puedeGestionarTerceros: boolean;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private taskService: SiniestrosService,
    public dialog: MatDialog,
    private authenticationService: AutenticacionService,
  ) {}
  onFileComplete(data: any) {
    this.filtraje.emit(1);
  }

  eliminar(id) {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: "¿Está seguro de eliminar este tercero?",
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.taskService.eliminarAdjunto(id).subscribe((x) => {
            this.filtraje.emit(1);
          });
        }
      });
  }

  descargar(element: any) {
    this.taskService.descargarAdjunto(element.id).subscribe((x) => {
      const data = new Blob([x as any], {
        type: element.extension,
      });
      saveAs(data, element.nombre);
    });
  }

  ngAfterContentInit(){
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.puedeGestionarTerceros = x.rol != "EstudioJuridicoExter" && !this.siniestro.pendienteVisado;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page, this.filtraje)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.taskService.getAdjuntos(this.siniestro.id.toString());
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;

          return data;
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
}
