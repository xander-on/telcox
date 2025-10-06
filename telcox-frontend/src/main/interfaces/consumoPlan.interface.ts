export interface ConsumoPlan {
  id                  : number;
  fecha_creacion      : string;           
  fecha_actualizacion : string;      
  estado              : boolean;
  token               : string;
  minutos_usados      : number;
  datos_usados_mb     : number;
  sms_usados          : number;
  fecha_inicio        : string;             
  fecha_fin           : string;               
  estado_consumo      : string;           
  plan_cliente        : number;
}
