import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContenedorEtapasComponent } from "./pages/adm/etapas/contenedor-etapas/contenedor-etapas.component";
import { AgregarEtapaComponent } from "./pages/adm/etapas/agregar-etapa/agregar-etapa.component";
import { EditarEtapaComponent } from "./pages/adm/etapas/editar-etapa/editar-etapa.component";
import { AgregarEstadoComponent } from "./pages/adm/etapas/agregar-estado/agregar-estado.component";
import { EditarEstadoComponent } from "./pages/adm/etapas/editar-estado/editar-estado.component";
import { TransicionesComponent } from "./pages/adm/etapas/transiciones/transiciones.component";
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
import { BndSiniestroComponent } from "./pages/bnd/bnd-siniestro/bnd-siniestro.component";
import { AuthGuard } from "./helpers/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { BndInicioComponent } from "./pages/bnd/bnd-inicio/bnd-inicio.component";
import { BndConsultaSiniestroComponent } from "./pages/bnd/bnd-consulta-siniestro/bnd-consulta-siniestro.component";
import { BndCertificacionComponent } from "./pages/bnd/bnd-certificacion/bnd-certificacion.component";
import { CertificablesComponent } from './pages/adm/etapas/certificables/certificables.component';

const routes: Routes = [
  { path: "", component: BndInicioComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "agregar-etapa",
    component: AgregarEtapaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "editar-etapa/:etapaId",
    component: EditarEtapaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas",
    component: ContenedorEtapasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas/:etapaId",
    component: ContenedorEtapasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas/:etapaId/agregar-estado",
    component: AgregarEstadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas/:etapaId/editar-estado/:estadoId",
    component: EditarEstadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas/:etapaId/estados-transiciones/:estadoId",
    component: TransicionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "etapas/:etapaId/estados-certificables/:estadoId",
    component: CertificablesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/analisis",
    component: BndAnalisisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/datosTercero",
    component: BndDatosTerceroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/cobroDirecto",
    component: BndCobroDirectoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/interCompania",
    component: BndInterCompaniaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/interBciZenit",
    component: BndInterBciZenitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/certificacion",
    component: BndCertificacionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/cartaIntercompania",
    component: BndCartaIntercompaniaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/prejudicialInterno",
    component: BndPrejudicialInternoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/asignacionJudicial",
    component: BndAsignacionJudicialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/esudiosJuridicos",
    component: BndEstudiosJuridicosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/cierreEstudios",
    component: BndCierreEstudiosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/consultaSiniestros",
    component: BndConsultaSiniestroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/recuperados",
    component: BndRecuperadosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "bandejas/noAplica",
    component: BndNoAplicaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "siniestros/:siniestroId/:tab",
    component: BndSiniestroComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
