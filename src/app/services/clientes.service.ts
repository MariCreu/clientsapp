import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { formatDate, DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getClientes(page: number): Observable<Cliente[]> {
    const url: string = 'http://localhost:8080/api/clientes/page/'+page;
    return this.http.get<Cliente[]>(url).pipe(
      tap((response:any)=>{
        ( response.content as Cliente[]).forEach(cliente=>{
          // console.log(cliente.nombre);
        });
      }),
      map(response => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es-US');
          return cliente;
        });
        return response;
      })
    );

  }
  create(cliente: Cliente): Observable<Cliente> {
    const url: string = 'http://localhost:8080/api/clientes';
    console.log(cliente);
    return this.http.post<Cliente>(url, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire('Error al crear al cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getCliente(id: number): Observable<Cliente> {
    const url: string = 'http://localhost:8080/api/clientes' + '/' + id;
    return this.http.get<Cliente>(url).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  updateCliente(cliente: Cliente): Observable<Cliente> {
    const url: string = 'http://localhost:8080/api/clientes' + '/' + cliente.id;
    return this.http.put<Cliente>(url, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire('Error al actualizar al cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  deleteCliente(id: number): Observable<Cliente> {
    const url: string = 'http://localhost:8080/api/clientes' + '/' + id;
    return this.http.delete<Cliente>(url, { headers: this.httpHeader });
  }
}
