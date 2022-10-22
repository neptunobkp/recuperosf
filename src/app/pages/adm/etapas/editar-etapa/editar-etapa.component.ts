import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { EtapasService } from "src/app/etapas.service";
import { List } from "src/app/models/list.model";

@Component({
  selector: "app-editar-etapa",
  templateUrl: "./editar-etapa.component.html",
  styleUrls: ["./editar-etapa.component.scss"]
})
export class EditarEtapaComponent implements OnInit {
  editarForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private taskService: EtapasService,
    private router: Router
  ) {
    this.editarForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      id: [""]
    });
  }

  etapaId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.etapaId = params.etapaId;
      this.taskService.getEtapa(this.etapaId).subscribe((etapa: List) => {
        this.editarForm.setValue(etapa);
      });
    });
  }

  updateList(title: string) {
    this.taskService.updateList(this.etapaId, title).subscribe(() => {
      this.router.navigate(["/etapas", this.etapaId]);
    });
  }

  onResetForm() {
    this.editarForm.reset();
  }

  onSaveForm() {
    if (this.editarForm.dirty && this.editarForm.valid) {
      this.taskService
        .updateList(this.etapaId, this.editarForm.value.nombre)
        .subscribe(() => {
          this.router.navigate(["/etapas", this.etapaId]);
        });
    }
  }
}
