import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador: any = null;
  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
        console.log(page);
      }
      this.clientesService.getClientes(page).subscribe(
        (clientes: any) => {
          this.clientes = clientes.content;
          this.paginador = clientes;
          console.log(clientes);
        }
      );
    });
    console.log(this.paginador);
  }
  deleteCliente(id: number): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Está segurp?',
      text: 'No podrá volver atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo!!!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Borrado!',
          'El cliente ya no existe',
          'success'
        );
        this.clientesService.deleteCliente(id).subscribe();
        this.clientes = this.clientes.filter(cli => cli.id !== id);
      }
    });
  }
}
