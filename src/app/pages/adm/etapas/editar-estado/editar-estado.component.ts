import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { EtapasService } from "src/app/etapas.service";

@Component({
  selector: "app-editar-estado",
  templateUrl: "./editar-estado.component.html",
  styleUrls: ["./editar-estado.component.scss"]
})
export class EditarEstadoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: EtapasService,
    private router: Router
  ) {}

  taskId: string;
  listId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params.estadoId;
      this.listId = params.etapaId;
    });
  }

  updateTask(title: string) {
    this.taskService
      .updateTask(this.listId, this.taskId, title)
      .subscribe(() => {
        this.router.navigate(["/etapas", this.listId]);
      });
  }
}
