import { Propietario } from "./../../../models/vehiculos/Propietario.model";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { BndAsignacionComponent } from "../bnd-asignacion/bnd-asignacion.component";
import { SiniestroMono } from "src/app/models/Siniestro";
import { SiniestrosService } from "src/app/siniestros.service";
import { DialogoConfirmacionComponent } from "src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component";
import {
  RutValidator,
  construirRut,
  rutClean,
  rutMantis,
} from "src/app/helpers/rut.validator";
import { Vehiculo } from "src/app/models/vehiculos/Vehiculo.model";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-bnd-agregar-tercero",
  templateUrl: "./bnd-agregar-tercero.component.html",
  styleUrls: ["./bnd-agregar-tercero.component.scss"],
})
export class BndAgregarTerceroComponent implements OnInit {
  siniestroId: string;

  form: FormGroup;
  datosGatilladosDesdeRut = false;
  propietario: Propietario;
  multiplesVehiculos: boolean = false;
  pensando: boolean = false;
  buscandoPersona: boolean = true;
  buscandoVehiculo: boolean = true;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BndAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private taskService: SiniestrosService,
    private fb: FormBuilder,
    public dialogo: MatDialog
  ) {
    this.siniestroId = data;
    this.form = fb.group(
      {
        id:[],
        rut: ["", Validators.required],
        nombres: [""],
        direccion: [""],
        alias: [""],
        correo: ["", Validators.email],
        correoAlt: ["", Validators.email],
        telefono: [""],
        telefonoAlt: [""],
        culpabilidad: [""],
        clasificacion: [""],
        patente: [""],
        marca: [""],
        modelo: [""],
        anio: [""],
        color: [""],
        numeroMotor: [""],
        numeroChasis: [""],
      },
      {
        validator: RutValidator("rut"),
      }
    );
  }

  ngOnInit(): void {}

  seleccionarVehiculo(patente) {
    const vehiculo = this.propietario.vehiculos.find(
      (t) => t.patente == patente
    );
    this.form.patchValue({
      patente: patente,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      color: vehiculo.color,
      numeroMotor: vehiculo.numeroMotor,
      numeroChasis: vehiculo.numeroChasis,
    });
    this.multiplesVehiculos = false;
  }

  buscarPorRut() {
    this.openSnackBar(
      "Esta operación de consulta puede tomar tiempo, por favor espere",
      "🍕"
    );

    this.pensando = true;
    this.taskService
      .buscarPersona(rutMantis(this.form.controls["rut"].value))
      .subscribe((propietarioResult: Propietario) => {
        this.pensando = false;
        this.multiplesVehiculos = false;
        this.propietario = propietarioResult;

        if (!propietarioResult) {
          this.openSnackBar("No encontramos registros para su búsqueda.", "☹️");
        } else if (this.encontroPropietarioConUnVehiculo()) {
          this.completarPropietarioYPrimerVEhiculo();
        } else if (this.encontroPropietarioCOnMultiplesVehiculos()) {
          this.multiplesVehiculos = true;
          this.completarPropietario();
        } else if (this.encontroPropietario()) {
          this.completarPropietario();
        }
      });
  }

  comprarDatosPorRut() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta operación tiene un costo, esta seguro de obtener los datos desde equifax?`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.pensando = true;
          this.taskService
            .comprarDatosPersona(
              rutMantis(this.form.controls["rut"].value),
              this.siniestroId
            )
            .subscribe((propietarioResult: Propietario) => {
              this.pensando = false;
              this.propietario = propietarioResult;
              this.multiplesVehiculos = false;

              if (!propietarioResult) {
                this.openSnackBar(
                  "No encontramos registros para su búsqueda.",
                  "☹️"
                );
              } else if (this.encontroPropietarioConUnVehiculo()) {
                this.completarPropietarioYPrimerVEhiculo();
              } else if (this.encontroPropietarioCOnMultiplesVehiculos()) {
                this.multiplesVehiculos = true;
                this.completarPropietario();
              } else if (this.encontroPropietario()) {
                this.completarPropietario();
              }
            });
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
    });
  }

  private encontroPropietarioCOnMultiplesVehiculos() {
    return (
      this.propietario &&
      this.propietario.vehiculos &&
      this.propietario.vehiculos.length > 1
    );
  }

  private encontroPropietarioConUnVehiculo() {
    return (
      this.propietario &&
      this.propietario.vehiculos &&
      this.propietario.vehiculos.length === 1 &&
      this.propietario.vehiculos[0] !== null
    );
  }

  private encontroPropietario() {
    return this.propietario;
  }

  private completarPropietario() {
    this.form.patchValue({
      id:this.propietario.id,
      rut: construirRut(this.propietario.rut),
      nombres: this.propietario.nombres,
      direccion: this.propietario.direccion,
      correo: this.propietario.correo,
      correoAlt: this.propietario.correoAlt,
      telefono: this.propietario.telefono,
      telefonoAlt: this.propietario.telefonoAlt,
    });
  }

  private completarPropietarioYPrimerVEhiculo() {
    const vehiculo = this.propietario.vehiculos[0];
    this.form.patchValue({
      patente: vehiculo.patente,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      color: vehiculo.color,
      numeroMotor: vehiculo.numeroMotor,
      numeroChasis: vehiculo.numeroChasis,
      id:this.propietario.id,
      rut: construirRut(this.propietario.rut),
      nombres: this.propietario.nombres,
      direccion: this.propietario.direccion,
      correo: this.propietario.correo,
      correoAlt: this.propietario.correoAlt,
      telefono: this.propietario.telefono,
      telefonoAlt: this.propietario.telefonoAlt,
    });
  }

  buscarPatente() {
    this.pensando = true;
    if (this.form.controls["patente"].value.length == 6) {
      this.taskService
        .buscarVehiculo(this.form.controls["patente"].value)
        .subscribe((resultadoPropietario: Propietario) => {
          this.pensando = false;
          this.propietario = resultadoPropietario;
          this.multiplesVehiculos = false;
          if (!resultadoPropietario) {
            this.openSnackBar(
              "No encontramos registros para su búsqueda.",
              "☹️"
            );
          } else if (this.encontroPropietarioConUnVehiculo()) {
            this.completarPropietarioYPrimerVEhiculo();
          }
        });
    }
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
            this.pensando = true;
            this.taskService
              .comprarDatosVehiculo(
                this.form.controls["patente"].value,
                this.siniestroId
              )
              .subscribe((resultadoPropietario: Propietario) => {
                this.pensando = false;
                this.propietario = resultadoPropietario;
                this.multiplesVehiculos = false;

                if (!resultadoPropietario) {
                  this.openSnackBar(
                    "No encontramos registros para su búsqueda.",
                    "☹️"
                  );
                } else if (
                  this.propietario &&
                  this.propietario.vehiculos &&
                  this.propietario.vehiculos.length === 1
                ) {
                  const vehiculo = this.propietario.vehiculos[0];
                  this.form.patchValue({
                    marca: vehiculo.marca,
                    modelo: vehiculo.modelo,
                    anio: vehiculo.anio,
                    color: vehiculo.color,
                    numeroMotor: vehiculo.numeroMotor,
                    numeroChasis: vehiculo.numeroChasis,
                    rut: construirRut(this.propietario.rut),
                    nombres: this.propietario.nombres,
                  });
                }
              });
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
