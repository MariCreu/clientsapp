import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent implements OnInit {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'PHP', 'C#', 'PHP'];
  constructor() { }
  oculto = true;
  mostrar = 'Mostrar listado';
  ngOnInit() {
  }
  ocultar() {
    if (this.oculto) {
      this.oculto = false;
      this.mostrar = 'Ocultar listado';
    } else {
      this.oculto = true;
      this.mostrar = 'Mostrar listado';
    }
  }
}
