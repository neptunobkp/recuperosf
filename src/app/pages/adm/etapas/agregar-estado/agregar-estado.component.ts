import { Component, OnInit } from "@angular/core";
import { EtapasService } from "src/app/etapas.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-agregar-estado",
  templateUrl: "./agregar-estado.component.html",
  styleUrls: ["./agregar-estado.component.scss"]
})
export class AgregarEstadoComponent implements OnInit {
  constructor(
    private taskService: EtapasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  listId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listId = params["etapaId"];
    });
  }

  createTask(title: string) {
    this.taskService
      .createTask(title, this.listId)
      .subscribe((newTask: Task) => {
        this.router.navigate(["../"], { relativeTo: this.route });
      });
  }
}
