import { Component, ViewChild } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { User } from "./models/user";
import { AutenticacionService } from "./services/autenticacion.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  currentUser: User;
  title = "recuperos-cliente";
  @ViewChild("sidenav") sidenav;
  constructor(
    private router: Router,
    private authenticationService: AutenticacionService
  ) {
    console.info("v 12.22.14");
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.sidenav) this.sidenav.close();
      }
    });

    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
