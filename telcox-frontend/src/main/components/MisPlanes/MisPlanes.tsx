import { clientePlanesService } from "../../services"
import { useEffect, useState } from "react";
import './MisPlanes.css';
import { PlanCliente } from "@/main/interfaces";
import { useMiPortalState } from "@/store/useMiPortalState";
import { consumosPlanesService } from "@/main/services/consumosPlanes.service";
import { useNavigate } from "react-router";
import { useAuth } from "@/main/hooks/useAuth";


export const MisPlanes = () => {
  
  const { clienteToken } = useAuth();

  const navigate = useNavigate();

  const [misPlanes, setMisPlanes] = useState<PlanCliente[]>([]);
  const { 
    miPlanSelected, 
    setMiPlanSelected,
    setConsumos 
  } = useMiPortalState();

  useEffect(() => {
    getDataPlanesCliente();
  }, []);
  
  const getDataPlanesCliente = async () => {

    if (!clienteToken) {
      navigate("/login"); 
      return;
    };

    const response = await clientePlanesService.getByCliente(clienteToken);
    if (!response) return;
    setMisPlanes(response);
  };

  const handleSelectPlan = async(plan: PlanCliente) => {
    setMiPlanSelected(plan);

    const consumos = await consumosPlanesService.getByContrato(plan.token);

    if (!consumos) return;
    setConsumos(consumos);
  };

  return (
    <div>
      <h3>Mis Planes Activos</h3>
      <div className="d-flex gap-3">
        {misPlanes.map((pc) => {
          const isSelected = miPlanSelected?.id?.toString() === pc.id.toString();
          const cardClass = `card-plan col-3 ${isSelected ? 'selected' : ''}`;

          return (
            <div
              key={pc.id}
              className={cardClass}
              onClick={() => handleSelectPlan(pc)}
            >
              {isSelected && (
                <i className="bi bi-check-circle check-icon position-absolute top-0 end-0 m-2 text-secondary"></i>
              )}
              <h4>{pc.plan.nombre}</h4>
              <p>{pc.celular_asociado}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
