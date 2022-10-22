import { SiniestroMono } from "./../../../models/Siniestro";
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
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";
import { MatDialog } from "@angular/material/dialog";
import { BndAsignacionComponent } from "../bnd-asignacion/bnd-asignacion.component";

@Component({
  selector: "app-bnd-resultados-mono",
  templateUrl: "./bnd-resultados-mono.component.html",
  styleUrls: ["./bnd-resultados-mono.component.scss"],
})
export class BndResultadosMonoComponent{
  
}
