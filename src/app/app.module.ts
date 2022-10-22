import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainPageComponent } from "./main-page/main-page.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ControlMessagesComponent } from "./shared/control-messages/control-messages.component";
import { ContenedorEtapasComponent } from "./pages/adm/etapas/contenedor-etapas/contenedor-etapas.component";
import { AgregarEtapaComponent } from "./pages/adm/etapas/agregar-etapa/agregar-etapa.component";
import { EditarEtapaComponent } from "./pages/adm/etapas/editar-etapa/editar-etapa.component";
import { AgregarEstadoComponent } from "./pages/adm/etapas/agregar-estado/agregar-estado.component";
import { EditarEstadoComponent } from "./pages/adm/etapas/editar-estado/editar-estado.component";
import { TransicionesComponent } from "./pages/adm/etapas/transiciones/transiciones.component";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import {MatBadgeModule} from '@angular/material/badge';
import { MatChipsModule } from "@angular/material/chips";
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { BndAnalisisComponent } from "./pages/bnd/bnd-analisis/bnd-analisis.component";
import { BndDatosTerceroComponent } from "./pages/bnd/bnd-datos-tercero/bnd-datos-tercero.component";
import { BndCobroDirectoComponent } from "./pages/bnd/bnd-cobro-directo/bnd-cobro-directo.component";
import { BndInterCompaniaComponent } from "./pages/bnd/bnd-inter-compania/bnd-inter-compania.component";
import { BndInterBciZenitComponent } from "./pages/bnd/bnd-inter-bci-zenit/bnd-inter-bci-zenit.component";
import { BndCartaIntercompaniaComponent } from "./pages/bnd/bnd-carta-intercompania/bnd-carta-intercompania.component";
import { BndPrejudicialInternoComponent } from "./pages/bnd/bnd-prejudicial-interno/bnd-prejudicial-interno.component";
import { BndAsignacionJudicialComponent } from "./pages/bnd/bnd-asignacion-judicial/bnd-asignacion-judicial.component";
import { BndEstudiosJuridicosComponent } from "./pages/bnd/bnd-estudios-juridicos/bnd-estudios-juridicos.component";
import { BndCierreEstudiosComponent } from "./pages/bnd/bnd-cierre-estudios/bnd-cierre-estudios.component";
import { BndRecuperadosComponent } from "./pages/bnd/bnd-recuperados/bnd-recuperados.component";
import { BndNoAplicaComponent } from "./pages/bnd/bnd-no-aplica/bnd-no-aplica.component";
import { BndPestanasComponent } from "./pages/bnd/bnd-pestanas/bnd-pestanas.component";
import { BndFiltrosComponent } from "./pages/bnd/bnd-filtros/bnd-filtros.component";
import { BndResultadosComponent } from "./pages/bnd/bnd-resultados/bnd-resultados.component";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { BndSiniestroComponent } from "./pages/bnd/bnd-siniestro/bnd-siniestro.component";
import { BndPestanasSiniestroComponent } from "./pages/bnd/bnd-pestanas-siniestro/bnd-pestanas-siniestro.component";
import { BndSiniestroGeneralComponent } from "./pages/bnd/bnd-siniestro-general/bnd-siniestro-general.component";
import { BndSiniestroGestionComponent } from "./pages/bnd/bnd-siniestro-gestion/bnd-siniestro-gestion.component";
import { BndSiniestroDocumentosComponent } from "./pages/bnd/bnd-siniestro-documentos/bnd-siniestro-documentos.component";
import { BndSiniestroBitacoraComponent } from "./pages/bnd/bnd-siniestro-bitacora/bnd-siniestro-bitacora.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { ComponentNavComponent } from "./shared/component-nav/component-nav.component";
import { ComponentMensajeSnackComponent } from "./shared/component-mensaje-snack/component-mensaje-snack.component";
import { BndTablaBitacoraComponent } from "./pages/bnd/bnd-tabla-bitacora/bnd-tabla-bitacora.component";
import { BndTablaObservacionesComponent } from "./pages/bnd/bnd-tabla-observaciones/bnd-tabla-observaciones.component";
import { BndObservacionesComponent } from "./pages/bnd/bnd-observaciones/bnd-observaciones.component";
import { LoginComponent } from "./pages/login/login.component";
import { BndInicioComponent } from "./pages/bnd/bnd-inicio/bnd-inicio.component";
import { BndResultadosMonoComponent } from "./pages/bnd/bnd-resultados-mono/bnd-resultados-mono.component";
import { BndAsignacionComponent } from "./pages/bnd/bnd-asignacion/bnd-asignacion.component";
import { BndListarTercerosComponent } from "./pages/bnd/bnd-listar-terceros/bnd-listar-terceros.component";
import { BndAgregarTerceroComponent } from "./pages/bnd/bnd-agregar-tercero/bnd-agregar-tercero.component";
import { BndEditarTerceroComponent } from "./pages/bnd/bnd-editar-tercero/bnd-editar-tercero.component";
import { DialogoConfirmacionComponent } from "./shared/dialogo-confirmacion/dialogo-confirmacion.component";
import { SoloNumerosDirective } from "./directivas/solo-numeros.directive";
import { SoloLetrasDirective } from "./directivas/solo-letras.directive";
import { FormatoRutDirective } from "./directivas/formato-rut.directive";
import { SoloAlfaNumericoDirective } from "./directivas/solo-alfa-numerico.directive";
import { BndConsultaSiniestroComponent } from "./pages/bnd/bnd-consulta-siniestro/bnd-consulta-siniestro.component";
import { FormatoPatenteDirective } from "./directivas/formato-patente.directive";
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { AlertComponent } from "./shared/alert/alert.component";
import { CabeceraComponent } from "./pages/bnd/macro/cabecera/cabecera.component";
import {
  registerLocaleData,
  LocationStrategy,
  HashLocationStrategy,
} from "@angular/common";
import localeEsCl from "@angular/common/locales/es-CL";
import { BndListarFacturasComponent } from "./pages/bnd/bnd-listar-facturas/bnd-listar-facturas.component";
import { FormateoRutPipe } from "./pipas/formateo-rut.pipe";
import { FileUploadComponent } from "./components/campos/file-upload/file-upload.component";
import { BndTablaAdjuntosComponent } from "./pages/bnd/bnd-tabla-adjuntos/bnd-tabla-adjuntos.component";
import { PipaRegionPipe } from "./pipas/pipa-region.pipe";
import { BndCertificacionComponent } from "./pages/bnd/bnd-certificacion/bnd-certificacion.component";
import { DialogoConMotivoComponent } from "./shared/dialogo-con-motivo/dialogo-con-motivo.component";
import { getEspanolPaginatorIntl } from "./intl/espanol-paginator-intl";
import { TotalesComponent } from "./shared/totales/totales.component";
import { PipaCompaniaPipe } from "./pipas/pipa-compania.pipe";
import { CertificablesComponent } from './pages/adm/etapas/certificables/certificables.component';
import { FormatoPesosDirective } from './directivas/formato-pesos.directive';
import { PipaDanoPipe } from './pipas/pipa-dano.pipe';
import { DialogoConEjecutivoComponent } from './shared/dialogo-con-ejecutivo/dialogo-con-ejecutivo.component';
import { CeldaAlertaComponent } from './components/campos/celda-alerta/celda-alerta.component';
import { CeldaGestionComponent } from './components/campos/celda-gestion/celda-gestion.component';

registerLocaleData(localeEsCl, "es-CL");
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ControlMessagesComponent,
    ContenedorEtapasComponent,
    AgregarEtapaComponent,
    EditarEtapaComponent,
    AgregarEstadoComponent,
    EditarEstadoComponent,
    TransicionesComponent,
    BndAnalisisComponent,
    BndDatosTerceroComponent,
    BndCobroDirectoComponent,
    BndInterCompaniaComponent,
    BndInterBciZenitComponent,
    BndCartaIntercompaniaComponent,
    BndPrejudicialInternoComponent,
    BndAsignacionJudicialComponent,
    BndEstudiosJuridicosComponent,
    BndCierreEstudiosComponent,
    BndRecuperadosComponent,
    BndNoAplicaComponent,
    BndPestanasComponent,
    BndFiltrosComponent,
    BndResultadosComponent,
    BndSiniestroComponent,
    BndPestanasSiniestroComponent,
    BndSiniestroGeneralComponent,
    BndSiniestroGestionComponent,
    BndSiniestroDocumentosComponent,
    BndSiniestroBitacoraComponent,
    NavbarComponent,
    ComponentNavComponent,
    ComponentMensajeSnackComponent,
    BndTablaBitacoraComponent,
    BndTablaObservacionesComponent,
    BndObservacionesComponent,
    LoginComponent,
    BndInicioComponent,
    BndResultadosMonoComponent,
    BndAsignacionComponent,
    BndListarTercerosComponent,
    BndAgregarTerceroComponent,
    BndEditarTerceroComponent,
    DialogoConfirmacionComponent,
    SoloNumerosDirective,
    SoloLetrasDirective,
    FormatoRutDirective,
    SoloAlfaNumericoDirective,
    BndConsultaSiniestroComponent,
    FormatoPatenteDirective,
    AlertComponent,
    CabeceraComponent,
    BndListarFacturasComponent,
    FormateoRutPipe,
    FileUploadComponent,
    BndTablaAdjuntosComponent,
    PipaRegionPipe,
    BndCertificacionComponent,
    DialogoConMotivoComponent,
    TotalesComponent,
    PipaCompaniaPipe,
    CertificablesComponent,
    FormatoPesosDirective,
    PipaDanoPipe,
    DialogoConEjecutivoComponent,
    CeldaAlertaComponent,
    CeldaGestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "es-CL" },
    { provide: MAT_DATE_LOCALE, useValue: "es-CL" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getEspanolPaginatorIntl() },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent, // <--- Aquí
  ],
})
export class AppModule {}
