import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'app-celda-alerta',
  templateUrl: './celda-alerta.component.html',
  styleUrls: ['./celda-alerta.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CeldaAlertaComponent implements OnInit {
  @Input() diasPrescripcion: number;
  @Input() alertaPrescripcion: number;
  constructor() { }

  ngOnInit(): void {
  }

}
