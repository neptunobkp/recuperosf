import { SiniestrosService } from "./../../../siniestros.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-bnd-listar-facturas",
  templateUrl: "./bnd-listar-facturas.component.html",
  styleUrls: ["./bnd-listar-facturas.component.scss"],
})
export class BndListarFacturasComponent implements OnInit {
  @Input() siniestroId: string;
  displayedColumns: string[] = [
    "rutProveedor",
    "nombreProveedor",
    "numeroFactura",
    "montoTotal",
    "detalle",
    "descarga",
  ];
  dataSource: any;
  urlBase: string;
  constructor(private siniestroService: SiniestrosService) {}

  ngOnInit(): void {
    this.siniestroService
      .getFacturas(this.siniestroId)
      .subscribe((resultado: any) => {
        this.dataSource = resultado.items;
        this.urlBase = resultado.urlBase;
      });
  }
}
