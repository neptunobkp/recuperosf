import { Component, OnInit } from "@angular/core";
import { List } from "src/app/models/list.model";
import { Task } from "src/app/models/task.model";
import { EtapasService } from "src/app/etapas.service";
import { Params, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-contenedor-etapas",
  templateUrl: "./contenedor-etapas.component.html",
  styleUrls: ["./contenedor-etapas.component.scss"],
})
export class ContenedorEtapasComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  selectedListId: string;
  constructor(
    private taskService: EtapasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.etapaId) {
        this.selectedListId = params.etapaId;
        this.taskService.getTasks(params.etapaId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined;
      }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(["/etapas"]);
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService
      .deleteTask(this.selectedListId, id)
      .subscribe((res: any) => {
        this.tasks = this.tasks.filter((val) => val.id !== id);
      });
  }
}
