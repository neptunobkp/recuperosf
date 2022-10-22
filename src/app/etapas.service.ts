import { Injectable } from "@angular/core";
import { WebRequestService } from "./web-request.service";
import { Task } from "./models/task.model";

@Injectable({
  providedIn: "root"
})
export class EtapasService {
  constructor(private webReqService: WebRequestService) {}

  getEtapa(id: string) {
    return this.webReqService.get(`etapas/${id}`);
  }

  getLists() {
    return this.webReqService.get("etapas");
  }

  createList(title: string) {
    return this.webReqService.post("etapas", { nombre: title });
  }

  updateList(id: string, title: string) {
    return this.webReqService.patch(`etapas`, { nombre: title, id });
  }

  updateTask(listId: string, taskId: string, title: string) {
    return this.webReqService.patch(`etapas/${listId}/estados`, {
      nombre: title,
      id: taskId
    });
  }

  getTransiciones(estadoId: string) {
    return this.webReqService.get(`estados/${estadoId}/transiciones`);
  }

  getCertificables(estadoId: string) {
    return this.webReqService.get(`estados/${estadoId}/certificables`);
  }


  postTransiciones(estadoId: string, payload) {
    return this.webReqService.post(`estados/${estadoId}/transiciones`, payload);
  }

  postCertificables(estadoId: string, payload) {
    return this.webReqService.post(`estados/${estadoId}/certificables`, payload);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`etapas/1/estados?id=${taskId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`etapas?id=${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`etapas/${listId}/estados`);
  }

  createTask(title: string, listId: string) {
    return this.webReqService.post(`etapas/${listId}/estados`, {
      nombre: title,
      etapaId: listId
    });
  }

  complete(task: Task) {
    return this.webReqService.delete(
      `etapas/${task._etapaId}/estados?id=${task.id}`
    );
  }
}
