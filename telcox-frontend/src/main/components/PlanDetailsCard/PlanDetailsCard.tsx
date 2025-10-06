import { useMiPortalState } from "@/store/useMiPortalState";

export const PlanDetailsCard = () => {
  const { miPlanSelected } = useMiPortalState();

  if (!miPlanSelected) return <p>No hay un plan seleccionado</p>;

  const { plan } = miPlanSelected;

  return (
    <div className="selected" style={{
      padding: '1rem',
      maxWidth: '400px',
    }}>
      <h4 style={{ marginBottom: '0.5rem' }}>{plan.nombre}</h4>
      <p>{plan.descripcion}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><strong>Minutos incluidos:</strong> {plan.minutos_incluidos}</li>
        <li><strong>Datos incluidos:</strong> {plan.datos_incluidos_mb} MB</li>
        <li><strong>Precio mensual:</strong> ${plan.precio_mensual}</li>
      </ul>
    </div>
  );
};
