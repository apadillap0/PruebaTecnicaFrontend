import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../../core/moledo/cliente.model';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ClienteService } from '../../../core/servicio/cliente.service';
import { AlertaService } from '../../../core/servicio/alerta.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clientes-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './clientes-dialog.component.html',
  styleUrls: ['./clientes-dialog.component.css']
})
export class ClientesDialogComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private clienteService: ClienteService,
    private alertaService: AlertaService
  ) {
    this.clienteForm = this.fb.group({
      id: [],
      sharedKey: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    });

    if (data) {
      this.clienteForm.patchValue(data);
    }
  }

  guardarCliente(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      let requestObservable: Observable<any>;
      if (cliente.id) {
        // Prepara la petición de actualización si el cliente ya tiene id
        requestObservable = this.clienteService.actualizarCliente(cliente);
      } else {
        // Prepara la petición de creación si el cliente es nuevo
        requestObservable = this.clienteService.crearCliente(cliente);
      }

      requestObservable.subscribe({
        next: (response) => {
          // Aquí manejas la respuesta de éxito (200 OK)
          this.alertaService.succes(response.message);
          this.dialogRef.close(response.data);
        },
        error: (error) => {
          // Aquí manejas los errores basados en el código de estado HTTP
          if (error.status === 409) {
            this.alertaService.warning(error.error.message);
          } else if (error.status === 500) {
            this.alertaService.error(error.error.message);
          } else {
            this.alertaService.error('Ha ocurrido un error inesperado.');
          }
        }
      });
    }
  }
}
