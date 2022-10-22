import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AutorizacionService } from "../services/autorizacion.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AlertaService } from "../services/alerta.service";
import { AutenticacionService } from "../services/autenticacion.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private autorizacionService: AutorizacionService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private alertaService: AlertaService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get("No-Auth") == "True")
      return next.handle(request.clone());

    const currentTokenValue = this.autorizacionService.currentTokenValue;

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (currentTokenValue && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentTokenValue}`,
        },
      });
    }
    return next.handle(request);
  }
}
