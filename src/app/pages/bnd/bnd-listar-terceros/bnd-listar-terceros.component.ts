import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  EventEmitter,
} from "@angular/core";
import { Entrada } from "src/app/models/Entrada";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SiniestrosService } from "src/app/siniestros.service";
import { ActivatedRoute, Router } from "@angular/router";
import { merge, Observable, of as observableOf } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { ItemTercero } from "src/app/models/itemTercero";
import { MatDialog } from "@angular/material/dialog";
import { BndAgregarTerceroComponent } from "../bnd-agregar-tercero/bnd-agregar-tercero.component";
import { DialogoConfirmacionComponent } from "src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component";
import { BndEditarTerceroComponent } from "../bnd-editar-tercero/bnd-editar-tercero.component";
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { User } from 'src/app/models/user';
import { SiniestroEstado } from 'src/app/models/SiniestroEstado';

@Component({
  selector: "app-bnd-listar-terceros",
  templateUrl: "./bnd-listar-terceros.component.html",
  styleUrls: ["./bnd-listar-terceros.component.scss"],
})
export class BndListarTercerosComponent implements AfterViewInit {
  @Input() siniestro: SiniestroEstado;
  filtraje: EventEmitter<number> = new EventEmitter<number>();
  displayedColumns: string[] = ["id"];

  data: ItemTercero[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  currentUser: User;
  puedeGestionarTerceros: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private taskService: SiniestrosService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private authenticationService: AutenticacionService,
  ) {
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
          return this.taskService.getTerceros(
            this.siniestro.id.toString(),
            this.paginator.pageSize,
            this.paginator.pageIndex
          );
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
          console.log('understand', data.items);
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  eliminarTercero(id) {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: "¿Está seguro de eliminar este tercero?",
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.taskService.eliminarTercero(id).subscribe((x) => {
            this.filtraje.emit(1);
          });
        }
      });
  }

  abrirModalTercero(): void {
    const dialogRef = this.dialog.open(BndAgregarTerceroComponent, {
      width: "100%",
      data: this.siniestro.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService
          .agregarTercero(this.siniestro.id.toString(), result)
          .subscribe((rest) => {
            this.filtraje.emit(1);
          });
      }
    });
  }

  abrirModalEditarTercero(id): void {
    const dialogRef = this.dialog.open(BndEditarTerceroComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoadingResults = true;
        this.taskService.editarTercero(result).subscribe((rest) => {
          this.filtraje.emit(1);
          this.isLoadingResults = false;
        });
      }
    });
  }
}
