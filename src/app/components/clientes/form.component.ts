import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { Observable } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente";
  private errores: string[] = [];
  constructor(private clienteService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }
  create() {
    this.clienteService.create(this.cliente).subscribe(resp => {
      this.cliente = resp;
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo cliente', this.cliente.nombre + ' ' + this.cliente.apellido, 'success');
    },
      err => {
        this.errores = err.error.error as string[];
        console.log(err.error.error);
        console.log(err.status);
      }
    );
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente: Cliente) => this.cliente = cliente);

      }
    });
  }
  updateCliente(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(resp => {
      this.router.navigate(['/clientes']);
      swal.fire('Cliente Actualizado', this.cliente.nombre, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.log(err.error.errors);
      console.log(err.status);
    });
  }
}
