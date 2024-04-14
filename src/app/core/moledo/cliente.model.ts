export class Cliente {
    id?: number;
    sharedKey: string;
    nombre: string;
    telefono: string;
    email: string;
    fechaInicio: Date;
    fechaFin: Date;
  
    constructor(
      sharedKey: string,
      telefono: string,
      nombre: string,
      email: string,
      fechaInicio: Date,
      fechaFin: Date,
      id?: number
    ) {
      this.sharedKey = sharedKey;
      this.nombre = nombre;
      this.telefono = telefono;
      this.email = email;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      if (id) {
        this.id = id;
      }
    }
  }   