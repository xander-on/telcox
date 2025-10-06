export interface Cliente {
  id                  : number;
  fecha_creacion      : string;     
  fecha_actualizacion : string;
  estado              : boolean;
  token               : string;
  nombre              : string;
  email               : string;
  telefono            : string;
  documento           : string;
}