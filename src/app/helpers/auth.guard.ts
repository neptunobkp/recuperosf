import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AutorizacionService } from "../services/autorizacion.service";
import { AutenticacionService } from "../services/autenticacion.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private autorizacionService: AutorizacionService,
    private autenticacionService: AutenticacionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentToken = this.autorizacionService.currentTokenValue;
    const currentUser = this.autenticacionService.currentUserValue;
    if (currentToken && currentUser) {
      const rol = currentUser.rol;
      let resultadoSeguridad = true;

      switch (state.url) {
        case "/bandejas/analisis":
        case "/bandejas/certificacion":
        case "/bandejas/asignacionJudicial": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
          ]);
          break;
        }

        case "/bandejas/datosTercero": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
            "Intercompania",
          ]);
          break;
        }

        case "/bandejas/cobroDirecto": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
            "CobroDirecto",
          ]);
          break;
        }

        case "/bandejas/interCompania":
        case "/bandejas/interBciZenit":
        case "/bandejas/cartaIntercompania": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Supervisor",
            "Intercompania",
          ]);
          break;
        }

        case "/bandejas/prejudicialInterno": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
            "PrejudicialInterno",
            "AdmPrejudicialInter",
            "AdmLegal",
          ]);
          break;
        }

        case "/bandejas/esudiosJuridicos": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Supervisor",
            "PrejudicialInterno",
            "AdmLegal",
            "EstudioJuridicoExter",
          ]);
          break;
        }

        case "/bandejas/noAplica": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
            "Intercompania",
            "PrejudicialInterno",
            "AdmPrejudicialInter",
            "AdmLegal",
            "EstudioJuridicoExter",
          ]);
          break;
        }

        case "/bandejas/cierreEstudios": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "AdmLegal",
            "Supervisor",
          ]);
          break;
        }

        case "/bandejas/recuperados": {
          resultadoSeguridad = this.tienePermisos(rol, ["Supervisor"]);
          break;
        }

        case "/bandejas/consultaSiniestros": {
          resultadoSeguridad = this.tienePermisos(rol, [
            "Analista",
            "Supervisor",
          ]);
          break;
        }

        default:
          break;
      }

      if (!resultadoSeguridad) {
        this.autenticacionService.logout();
        this.router.navigate(["/login"]);
        return false;
      } else return true;
    }
    this.autenticacionService.logout();
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  tienePermisos(rol, roles: string[]): boolean {
    const resultado = roles.includes(rol);
    return resultado;
  }
}
