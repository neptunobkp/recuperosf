import { Component, OnInit, Input } from "@angular/core";
import { DialogoConEjecutivoComponent } from 'src/app/shared/dialogo-con-ejecutivo/dialogo-con-ejecutivo.component';
import { TotalBandeja } from "src/app/models/siniestros/TotalBandeja.model";

@Component({
  selector: "app-totales",
  templateUrl: "./totales.component.html",
  styleUrls: ["./totales.component.scss"],
})
export class TotalesComponent implements OnInit {
  @Input() totalBandeja: TotalBandeja;
  constructor() {}

  ngOnInit(): void {
  }
}
