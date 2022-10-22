import { ObservacionesService } from "./../../../services/siniestros/observaciones.service";
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
import { merge, Observable, of as observableOf, Subscription } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";

@Component({
  selector: "app-bnd-tabla-observaciones",
  templateUrl: "./bnd-tabla-observaciones.component.html",
  styleUrls: ["./bnd-tabla-observaciones.component.scss"],
})
export class BndTablaObservacionesComponent implements AfterViewInit {
  @Input() siniestroId: string;
  private subscription: Subscription;
  displayedColumns: string[] = ["detalle"];

  data: Entrada[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filtraje: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private taskService: SiniestrosService,
    private route: ActivatedRoute,
    private router: Router,
    private observacionesService: ObservacionesService
  ) {}

  ngAfterViewInit() {
    this.subscription = this.observacionesService.gets().subscribe(() => {
      this.filtraje.emit(1);
    });

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page, this.filtraje)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.taskService.getObservaciones(
            "",
            this.paginator.pageSize,
            this.paginator.pageIndex,
            this.siniestroId
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;

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
}
