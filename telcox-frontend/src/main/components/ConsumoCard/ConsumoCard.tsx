import { ConsumoPlan } from "@/main/interfaces";
import { useMiPortalState } from "@/store/useMiPortalState";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface Props {
  consumoData: ConsumoPlan;
}

export const ConsumoCard = ({ consumoData }: Props) => {
  const { miPlanSelected } = useMiPortalState();

  if (!miPlanSelected) return null;

  const plan = miPlanSelected.plan;

  const minutosPercent = Math.min(
    (consumoData.minutos_usados / plan.minutos_incluidos) * 100,
    100
  );

  const datosPercent = Math.min(
    (consumoData.datos_usados_mb / plan.datos_incluidos_mb) * 100,
    100
  );


  return (
    <div className="card selected text-white">
     
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Consumo Actual</h4>
          <p className="mb-0">
            <strong>Periodo:</strong> {consumoData.fecha_inicio} →{" "}
            {consumoData.fecha_fin}
          </p>
        </div>

        <div className="row text-center">
          <div className="col-md-6">
            <h6>Minutos</h6>
            <div style={{ width: 100, margin: "0 auto" }}>
              <CircularProgressbar
                value={minutosPercent}
                text={`${Math.round(minutosPercent)}%`}
                styles={buildStyles({
                  textColor: "#0d6efd",
                  pathColor: "#0d6efd",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
            <small>
              {consumoData.minutos_usados} / {plan.minutos_incluidos}
            </small>
          </div>

          <div className="col-md-6">
            <h6>Datos</h6>
            <div style={{ width: 100, margin: "0 auto" }}>
              <CircularProgressbar
                value={datosPercent}
                text={`${Math.round(datosPercent)}%`}
                styles={buildStyles({
                  textColor: "#198754",
                  pathColor: "#198754",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
            <small>
              {consumoData.datos_usados_mb} / {plan.datos_incluidos_mb} MB
            </small>
          </div>

          
        </div>
      </div>
    </div>
  );
};
