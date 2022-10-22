import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { BndAsignacionComponent } from "../bnd-asignacion/bnd-asignacion.component";
import { SiniestrosService } from "src/app/siniestros.service";
import { Vehiculo } from "src/app/models/Vehiculo";
import { DialogoConfirmacionComponent } from "src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component";
import { Tercero } from "src/app/models/tercero.model";
import { rutMantis } from "src/app/helpers/rut.validator";

@Component({
  selector: "app-bnd-editar-tercero",
  templateUrl: "./bnd-editar-tercero.component.html",
  styleUrls: ["./bnd-editar-tercero.component.scss"],
})
export class BndEditarTerceroComponent implements OnInit {
  siniestroId: number;
  id: number;
  form: FormGroup;
  multiplesVehiculos: boolean = false;
  pensando: boolean = false;

  clasificaciones = [
    { valor: "1", texto: "Conductor" },
    { valor: "2", texto: "Propietario" },
  ];

  culpabilidades = [
    { valor: "1", texto: "Culpable" },
    { valor: "2", texto: "Inocente" },
    { valor: "3", texto: "Ambos" },
  ];

  constructor(
    public dialogRef: MatDialogRef<BndAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private taskService: SiniestrosService,
    private fb: FormBuilder,
    public dialogo: MatDialog
  ) {
    this.id = data;
    this.form = fb.group({
      id: [""],
      siniestroId: [""],
      rut: [{ value: "" }],
      nombres: [""],
      direccion: [""],
      correo: [""],
      correoAlt: [""],
      telefono: [""],
      telefonoAlt: [""],
      culpabilidad: [""],
      clasificacion: [""],
      alias: [""],
      patente: [{ value: "" }],
      marca: [""],
      modelo: [""],
      anio: 2020,
      color: [""],
      numeroMotor: [""],
      numeroChasis: [""],
      esPrincipal: [""],
    });
  }

  ngOnInit(): void {
    this.pensando = true;
    this.taskService.obtenerTercero(this.id).subscribe((tercero: Tercero) => {
      this.siniestroId = tercero.siniestroId;
      this.form.setValue(tercero);
      this.pensando = false;
    });
  }

  comprarDatos() {
    if (this.form.controls["patente"].value.length == 6) {
      this.dialogo
        .open(DialogoConfirmacionComponent, {
          data: `¿Esta operación tiene un costo, esta seguro de obtener los datos desde equifax?`,
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.taskService
              .comprarDatosVehiculo(
                this.form.controls["patente"].value,
                this.siniestroId.toString()
              )
              .subscribe((vehiculo: Vehiculo) => {
                this.form.patchValue({
                  marca: vehiculo.marca,
                  modelo: vehiculo.modelo,
                  anio: vehiculo.anio,
                  color: vehiculo.color,
                  numeroMotor: vehiculo.numeroMotor,
                  numeroChasis: vehiculo.numeroChasis,
                });
              });
          } else {
          }
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.dirty && this.form.valid) {
      this.form.value.rut = rutMantis(this.form.value.rut);
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
