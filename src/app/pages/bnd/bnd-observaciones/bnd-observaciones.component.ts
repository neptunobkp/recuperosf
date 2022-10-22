import { BndResultadosComponent } from "./../bnd-resultados/bnd-resultados.component";
import { ObservacionesService } from "./../../../services/siniestros/observaciones.service";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SiniestrosService } from "src/app/siniestros.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-bnd-observaciones",
  templateUrl: "./bnd-observaciones.component.html",
  styleUrls: ["./bnd-observaciones.component.scss"],
})
export class BndObservacionesComponent implements OnInit {
  @Input() siniestroId: string;
  editarForm: any;
  currentUser: User;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  tiposObservaciones: any[];
  constructor(
    private formBuilder: FormBuilder,
    private taskService: SiniestrosService,
    private authenticationService: AutenticacionService,
    private observacionesService: ObservacionesService,
    private _snackBar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });

    this.editarForm = this.formBuilder.group({
      detalle: ["", Validators.required],
      tipoObservacionId: ["", Validators.required],
      numero: [this.siniestroId],
    });
  }

  ngOnInit(): void {
    this.taskService.getTiposOservacion().subscribe((tipos: any[]) => {
      this.tiposObservaciones = tipos;
    });
  }

  onSaveForm() {
    if (this.editarForm.dirty && this.editarForm.valid) {
      this.taskService
        .guardarObservacion(this.editarForm.value, this.siniestroId)
        .subscribe(() => {
          this._snackBar.open("Observacion guardada", "Ok", {
            duration: 2000,
          });
          this.editarForm.reset();
          Object.keys(this.editarForm.controls).forEach((key) => {
            this.editarForm.controls[key].setErrors(null);
          });
          this.observacionesService.refrescar();
        });
    }
  }
}
