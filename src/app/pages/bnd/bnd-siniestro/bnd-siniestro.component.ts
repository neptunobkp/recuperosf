import { SiniestroCabecera } from "./../../../models/siniestros/SiniestroCabecera";
import { SiniestrosService } from "src/app/siniestros.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Location } from "@angular/common";
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-bnd-siniestro",
  templateUrl: "./bnd-siniestro.component.html",
  styleUrls: ["./bnd-siniestro.component.scss"],
})
export class BndSiniestroComponent implements OnInit {
  siniestroId: string;
  siniestro: SiniestroCabecera;
  indiceSeleccionado  : number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private siniestroService: SiniestrosService
  ) {}
  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params.tab == "gestion")
      {
        console.log('llego a gestion');
        this.indiceSeleccionado = 1;
      }
      
      this.siniestroId = atob(params.siniestroId);

      this.siniestroService
        .getSiniestroCabeceraa(this.siniestroId)
        .subscribe((result: SiniestroCabecera) => {
          this.siniestro = result;
        });
    });
  }
}
