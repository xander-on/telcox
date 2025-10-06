import { ConsumoPlan, PlanCliente } from '@/main/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MiPortalState {

  clienteToken: string | null
  setClienteToken: (token: string) => void
  clearClienteToken: () => void

  clienteNombre: string
  setClienteNombre: (nombre: string) => void

  miPlanSelected: PlanCliente | null
  setMiPlanSelected: (plan: PlanCliente) => void

  consumos: ConsumoPlan[]
  setConsumos: (consumos: ConsumoPlan[]) => void
  
}

export const useMiPortalState = create<MiPortalState>()(
  devtools(
    (set) => ({
      clienteToken: localStorage.getItem("clienteToken"),
      clienteNombre: localStorage.getItem("clienteNombre"),

      miPlanSelected: null,
      consumos: [],

      setClienteToken: (token) => {
        localStorage.setItem("clienteToken", token)
        set({ clienteToken: token }, false, 'setClienteToken')
      },

      setClienteNombre: (nombre) => {
        localStorage.setItem("clienteNombre", nombre)
        set({ clienteNombre: nombre }, false, 'setClienteNombre')
      },

      clearClienteToken: () => {
        localStorage.removeItem("clienteToken")
        set({ clienteToken: null }, false, 'clearClienteToken')
        set({ miPlanSelected: null }, false, 'clearMiPlanSelected')
        set({ consumos: [] }, false, 'clearConsumos')
      },

      setMiPlanSelected: (plan) => set({ miPlanSelected: plan }, false, 'setMiPlanSelected'),
      setConsumos: (consumos) => set({ consumos }, false, 'setConsumos'),
    
    }), { name: 'PlanesStore' })
)