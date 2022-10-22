import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertaService } from "src/app/services/alerta.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  ngOnInit() {}
}
