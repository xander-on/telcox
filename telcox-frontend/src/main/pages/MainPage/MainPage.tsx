import { ConsumoCard, MisPlanes, PlanDetailsCard, TablaConsumos } from "@/main/components";
import { useMiPortalState } from "@/store/useMiPortalState";

export const MainPage = () => {

  const { consumos } = useMiPortalState();

  const hoy = new Date();

  const consumoActual = consumos.find((c) => {
    const inicio = new Date(c.fecha_inicio);
    const fin = new Date(c.fecha_fin);
    return hoy >= inicio && hoy <= fin;
  });

  return (

    <div>

      <MisPlanes />

      <div className="row mt-4">
        <div className="col-4">
          <PlanDetailsCard/>
        </div>

        <div className="col">
          {consumoActual && <ConsumoCard consumoData={consumoActual}/>}
        </div>
      </div>
  
      <TablaConsumos/>
    </div>
  )
}
