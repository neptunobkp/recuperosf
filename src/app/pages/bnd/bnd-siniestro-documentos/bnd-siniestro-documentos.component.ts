import { SiniestroDocumento } from "./../../../models/siniestros/SiniestroDocumento";
import { SiniestrosService } from "src/app/siniestros.service";
import { ReactiveFormsModule } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-bnd-siniestro-documentos",
  templateUrl: "./bnd-siniestro-documentos.component.html",
  styleUrls: ["./bnd-siniestro-documentos.component.scss"],
})
export class BndSiniestroDocumentosComponent implements OnInit {
  @Input() siniestroId: string;
  siniestro: SiniestroDocumento;
  estaSiniestroListo: boolean;
  constructor(
    private formModule: FormsModule,
    private reactiveFormModule: ReactiveFormsModule,
    private taskService: SiniestrosService
  ) {}

  ngOnInit(): void {
    this.taskService
      .getSiniestroDocumento(this.siniestroId)
      .subscribe((resultado: SiniestroDocumento) => {
        this.siniestro = resultado;
        this.estaSiniestroListo = true;
      });
  }
}
