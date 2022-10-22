import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AutorizacionService } from "../services/autorizacion.service";
import { AutenticacionService } from "../services/autenticacion.service";
import { AlertaService } from "../services/alerta.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AutenticacionService,
    private autorizacionService: AutorizacionService,
    private alertaService: AlertaService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.alertaService.error("Sesion caducada");
          this.autorizacionService.logout();
          this.authenticationService.logout();
          location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
