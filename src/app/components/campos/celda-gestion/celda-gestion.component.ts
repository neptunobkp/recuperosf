import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celda-gestion',
  templateUrl: './celda-gestion.component.html',
  styleUrls: ['./celda-gestion.component.scss']
})
export class CeldaGestionComponent implements OnInit {
  @Input() dias: number;
  @Input() tipoAlerta: number;
  constructor() { }

  ngOnInit(): void {
  }

}
