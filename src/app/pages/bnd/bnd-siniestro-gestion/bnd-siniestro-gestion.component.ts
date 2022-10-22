import { ControlMessagesComponent } from "./../../../shared/control-messages/control-messages.component";
import { Campo } from "./../../../models/misc/Campo.model";
import { SiniestroGestionPayload } from "./../../../models/siniestros/SiniestroGestionPayload.model";
import { SiniestroGestion } from "./../../../models/siniestros/SiniestroGestion.model";
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SiniestrosService } from "src/app/siniestros.service";
import { SiniestroEstado } from "src/app/models/SiniestroEstado";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComponentMensajeSnackComponent } from "src/app/shared/component-mensaje-snack/component-mensaje-snack.component";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";
import {
  TiposCompania,
  TiposCompaniaBciZenit,
} from "src/app/models/tipos/TiposCompania.model";
import { ItemLista } from "src/app/models/ItemLista";
import { MatDialog } from "@angular/material/dialog";
import { DialogoConMotivoComponent } from "src/app/shared/dialogo-con-motivo/dialogo-con-motivo.component";
import { ObservacionesService } from "src/app/services/siniestros/observaciones.service";
import { DialogoConfirmacionComponent } from "src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';


export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

      if (displayFormat === 'input') {

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const zeroPad = (num, places) => String(num).padStart(places, '0');

          return `${zeroPad(day,2)}-${zeroPad(month,2)}-${year.toString().substr(-2)}`;
      }

      return date.toLocaleDateString('es-CL');
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'short', day: 'numeric' },
},
display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
}
};

@Component({
  selector: "app-bnd-siniestro-gestion",
  templateUrl: "./bnd-siniestro-gestion.component.html",
  styleUrls: ["./bnd-siniestro-gestion.component.scss"],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: MAT_DATE_LOCALE, useValue: "es-CL" },
  {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
  }
  ]
})
export class BndSiniestroGestionComponent implements OnInit {
  @Input() siniestroId: string;
  editarForm: any;
  siniestro: SiniestroGestion;
  isLoadingResults = false;
  currentUser: User;
  ejecutivos: any[];
  puedeGestionarProbabilidad: boolean = false;
  isRateLimitReached = false;
  otrasCompanias = TiposCompania;
  companiasBciZenit = TiposCompaniaBciZenit;
  probabilidades = [
    { valor: "1", texto: "Baja" },
    { valor: "2", texto: "Media" },
    { valor: "3", texto: "Alta" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: SiniestrosService,
    private _snackBar: MatSnackBar,
    private authenticationService: AutenticacionService,
    private dialog: MatDialog,
    private observacionesService: ObservacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit gestion');
    this.router.navigate(['/siniestros',  btoa(this.siniestroId), 'gestion' ]);
    this.puedeGestionarProbabilidad =
      this.currentUser.rol == "Supervisor" ||
      this.currentUser.rol == "Analista";
    this.reloadData();
  }

  select(estadoSiguienteId) {
    this.taskService
      .getPermisosPorEstado(this.siniestroId, estadoSiguienteId)
      .subscribe((siniestro: SiniestroGestion) => {
        this.editarForm = this.formBuilder.group({
          estadoId: [estadoSiguienteId],
          probabilidad: [
            {
              value: siniestro.probabilidad.toString(),
              disabled: !siniestro.permisos.probabilidad.editar,
            },
          ],
          companiaTercero: [
            {
              value: siniestro.companiaTercero,
              disabled: !siniestro.permisos.companiaTercero.editar,
            },
          ],
          numeroTercero: [
            {
              value: siniestro.numeroTercero,
              disabled: !siniestro.permisos.numeroTercero.editar,
            },
          ],
          fechaPromesa: [
            {
              value: siniestro.fechaPromesa,
              disabled: !siniestro.permisos.fechaPromesa.editar,
            },
          ],
          monto: [
            {
              value: siniestro.monto,
              disabled: !siniestro.permisos.monto.editar,
            },
          ],
          telefono: [
            {
              value: siniestro.telefono,
              disabled: !siniestro.permisos.telefono.editar,
            },
          ],
          fechaCarta: [
            {
              value: siniestro.fechaCarta,
              disabled: !siniestro.permisos.fechaCarta.editar,
            },
          ],
          montoSolicitado: [
            {
              value: siniestro.montoSolicitado,
              disabled: !siniestro.permisos.montoSolicitado.editar,
            },
          ],
          estudioAbogados: [
            {
              value: siniestro.ejecutivoId
                ? siniestro.ejecutivoId.toString()
                : null,
              disabled: !siniestro.permisos.estudioAbogados.editar,
            },
          ],
        });
        this.siniestro = siniestro;
      });
    this.editarForm.markAsDirty();
  }

  private reloadData() {
    this.taskService
      .getUsuarios("EstudioJuridicoExter")
      .subscribe((result: ItemLista[]) => {
        this.ejecutivos = result;
      });

    this.taskService
      .getSiniestroGestion(this.siniestroId)
      .subscribe((siniestro: SiniestroGestion) => {
        console.log('taskservice', siniestro);
        this.editarForm = this.formBuilder.group({
          estadoId: [
            {
              value: siniestro.estadoId,
              disabled: siniestro.permisos.soloLectura,
            },
          ],
          probabilidad: [
            {
              value: siniestro.probabilidad.toString(),
              disabled: !siniestro.permisos.probabilidad.editar,
            },
          ],
          companiaTercero: [
            {
              value: siniestro.companiaTercero,
              disabled: !siniestro.permisos.companiaTercero.editar,
            },
          ],
          numeroTercero: [
            {
              value: siniestro.numeroTercero,
              disabled: !siniestro.permisos.numeroTercero.editar,
            },
          ],
          fechaPromesa: [
            {
              value: siniestro.fechaPromesa,
              disabled: !siniestro.permisos.fechaPromesa.editar,
            },
          ],
          monto: [
            {
              value: siniestro.monto,
              disabled: !siniestro.permisos.monto.editar,
            },
          ],
          telefono: [
            {
              value: siniestro.telefono,
              disabled: !siniestro.permisos.telefono.editar,
            },
          ],
          fechaCarta: [
            {
              value: siniestro.fechaCarta,
              disabled: !siniestro.permisos.fechaCarta.editar,
            },
          ],
          montoSolicitado: [
            {
              value: siniestro.montoSolicitado,
              disabled: !siniestro.permisos.montoSolicitado.editar,
            },
          ],
          estudioAbogados: [
            {
              value: siniestro.ejecutivoId
                ? siniestro.ejecutivoId.toString()
                : null,
              disabled: !siniestro.permisos.estudioAbogados.editar,
            },
          ],
        });
        this.siniestro = siniestro;
      });
  }

  bindCampo(nombre): Campo {
    return {
      value: this.editarForm.controls[nombre].value,
      touched: this.editarForm.controls[nombre].touched,
    };
  }

  bindMonto(nombre): Campo {
    return {
      value: this.editarForm.controls[nombre].value ? this.editarForm.controls[nombre].value.toString().replace(/\./g,'')  : this.editarForm.controls[nombre].value,
      touched: this.editarForm.controls[nombre].touched,
    }
  }

  onSaveForm() {
    let payload: SiniestroGestionPayload = {
      estadoId: this.bindCampo("estadoId"),
      probabilidad: this.bindCampo("probabilidad"),
      companiaTercero: this.bindCampo("companiaTercero"),
      numeroTercero: this.bindCampo("numeroTercero"),
      fechaPromesa: this.bindCampo("fechaPromesa"),
      monto: this.bindMonto("monto"),
      telefono: this.bindCampo("telefono"),
      fechaCarta: this.bindCampo("fechaCarta"),
      montoSolicitado: this.bindMonto("montoSolicitado"),
      estudioAbogados: this.bindCampo("estudioAbogados"),
    };


    if ( this.editarForm.valid) {
      this.isLoadingResults = true;
      this.taskService
        .cambiarEstado(this.siniestroId, payload)
        .subscribe((mensajes: string[]) => {
          if (mensajes && mensajes.length > 0)
            this._snackBar.openFromComponent(ComponentMensajeSnackComponent, {
              data: mensajes,
              duration: 10000,
              horizontalPosition: "right",
            });
          this.isLoadingResults = false;
          window.location.reload();
        });
    }
  }

  aprobar(): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: "¿Esta seguro de certificar este cambio?",
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.isLoadingResults = true;
          this.taskService.visarAceptar(this.siniestroId).subscribe((rest) => {
            this.isLoadingResults = false;
            window.location.reload();
          });
        }
      });
  }

  rechazar(): void {
    event.stopPropagation();
    this.dialog
      .open(DialogoConMotivoComponent, {
        data:
          "Por favor ingrese un comentario indicando el motivo del rechazo.",
        width: "600px",
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data && data.detalle) {
          this.isLoadingResults = true;
          this.taskService
            .visarRechazar(this.siniestroId, data)
            .subscribe((rest) => {
              this.isLoadingResults = false;
              this.observacionesService.refrescar();
              window.location.reload();
            });
        }
      });
  }
}