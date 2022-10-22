import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { AutenticacionService } from "src/app/services/autenticacion.service";

@Component({
  selector: "app-component-nav",
  templateUrl: "./component-nav.component.html",
  styleUrls: ["./component-nav.component.scss"],
})
export class ComponentNavComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AutenticacionService) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }

  ngOnInit(): void {}
}
