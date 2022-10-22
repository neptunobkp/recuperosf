import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SiniestroMono } from "src/app/models/Siniestro";
import { SiniestrosService } from "src/app/siniestros.service";
import { ItemLista } from "src/app/models/ItemLista";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-bnd-asignacion",
  templateUrl: "./bnd-asignacion.component.html",
  styleUrls: ["./bnd-asignacion.component.scss"],
})
export class BndAsignacionComponent implements OnInit {
  ejecutivos: any[];
  form: FormGroup;
  accidente: any;
  etiqueta: string;
  constructor(
    public dialogRef: MatDialogRef<BndAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SiniestroMono,
    private taskService: SiniestrosService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      ejecutivo: [data.ejecutivoId, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    let rolAsignable = "CobroDirecto";
    this.etiqueta = "Ejecutivo";

    if (this.data.etapaId == 26) {
      rolAsignable = "EstudioJuridicoExter";
      this.etiqueta = "Estudio jurídico";

      this.taskService
        .getAccidente(this.data.id.toString())
        .subscribe((resultAccidente) => {
          this.accidente = resultAccidente;
        });
    }
    if (this.data.etapaId == 25) {
      this.etiqueta = "Ejecutivo";
      rolAsignable = "PrejudicialInterno";
    }

    this.taskService
      .getUsuarios(rolAsignable)
      .subscribe((result: ItemLista[]) => {
        this.ejecutivos = result;
      });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
