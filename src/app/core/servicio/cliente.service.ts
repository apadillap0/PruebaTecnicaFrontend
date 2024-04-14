import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../moledo/cliente.model';
import { GenericResponse } from '../moledo/generic-response';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8000/cliente'; 

  constructor(private http: HttpClient) { }

  obtenerTodosLosClientes(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(this.apiUrl);
  }

  buscarClientePorSharedKey(sharedKey: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.apiUrl}/buscar?sharedKey=${sharedKey}`);
  }

  crearCliente(cliente: Cliente): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.apiUrl, cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(this.apiUrl, cliente);
  }
}