import { Component, OnInit } from "@angular/core";
import { EtapasService } from "src/app/etapas.service";
import { Router } from "@angular/router";
import { List } from "src/app/models/list.model";

@Component({
  selector: "app-agregar-etapa",
  templateUrl: "./agregar-etapa.component.html",
  styleUrls: ["./agregar-etapa.component.scss"]
})
export class AgregarEtapaComponent implements OnInit {
  constructor(private taskService: EtapasService, private router: Router) {}

  ngOnInit() {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      this.router.navigate(["/etapas", list]);
    });
  }
}
