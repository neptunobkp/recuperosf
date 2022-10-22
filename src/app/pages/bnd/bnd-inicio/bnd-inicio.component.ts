import { Component, OnInit } from "@angular/core";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-bnd-inicio",
  templateUrl: "./bnd-inicio.component.html",
  styleUrls: ["./bnd-inicio.component.scss"],
})
export class BndInicioComponent implements OnInit {
  currentUser: User;
  constructor(
    private authenticationService: AutenticacionService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {
    if (this.currentUser && this.currentUser.rol) {
      if (
        this.currentUser.rol == "AdmLegal" ||
        this.currentUser.rol == "AdmPrejudicialInter" ||
        this.currentUser.rol == "PrejudicialInterno"
      ) {
        this.router.navigate(["bandejas/prejudicialInterno"]);
      }

      if (this.currentUser.rol == "Intercompania") {
        this.router.navigate(["bandejas/datosTercero"]);
      }

      if (this.currentUser.rol == "CobroDirecto") {
        this.router.navigate(["bandejas/cobroDirecto"]);
      }

      if (this.currentUser.rol == "Analista") {
        this.router.navigate(["bandejas/analisis"]);
      }

      if (this.currentUser.rol == "Supervisor") {
        this.router.navigate(["bandejas/analisis"]);
      }

      if (this.currentUser.rol == "EstudioJuridicoExter") {
        this.router.navigate(["bandejas/esudiosJuridicos"]);
      }
    }
  }
}
