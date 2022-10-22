import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-dialogo-con-motivo",
  templateUrl: "./dialogo-con-motivo.component.html",
  styleUrls: ["./dialogo-con-motivo.component.scss"],
})
export class DialogoConMotivoComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogo: MatDialogRef<DialogoConMotivoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      detalle: ["", Validators.required],
    });
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    if (this.form.dirty && this.form.valid) {
      this.dialogo.close(this.form.value);
    }
  }

  ngOnInit(): void {}
}
