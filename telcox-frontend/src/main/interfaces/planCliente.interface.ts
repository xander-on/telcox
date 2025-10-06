import { Plan } from "./plan.interface"

export interface PlanCliente {
  id          : number
  token       : string
  cliente     : number
  plan        : Plan
  activo      : boolean
  fecha_inicio: string
  celular_asociado: string
}