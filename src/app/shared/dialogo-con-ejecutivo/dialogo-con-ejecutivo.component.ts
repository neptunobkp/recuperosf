import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialogo-con-ejecutivo',
  templateUrl: './dialogo-con-ejecutivo.component.html',
  styleUrls: ['./dialogo-con-ejecutivo.component.scss']
})
export class DialogoConEjecutivoComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoConEjecutivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data : string
  ) {}

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  ngOnInit(): void {}
}
