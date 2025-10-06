import { useMiPortalState } from "@/store/useMiPortalState";
import './TablaConsumos.css'

export const TablaConsumos = () => {
  const { consumos } = useMiPortalState();


  if (!consumos || consumos.length === 0) {
    return null;
  }

  const hoy = new Date();

  const consumosPasados = consumos
    .filter((c) => {
      const fin = new Date(c.fecha_fin);
      return fin < hoy;
    })
    .slice()
    .sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());

  return (
    <div className="mt-4">

      <h5 className="mb-3">Historial de consumos</h5>

      <div className="table-responsive">
        <table className="table align-middle custom-table">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Fecha inicio</th>
              <th scope="col">Fecha fin</th>
              <th scope="col">Minutos usados</th>
              <th scope="col">Datos usados (MB)</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {consumosPasados.length > 0 ? (
              consumosPasados.map((c) => (
                <tr key={c.id}>
                  <td>{c.fecha_inicio}</td>
                  <td>{c.fecha_fin}</td>
                  <td>{c.minutos_usados}</td>
                  <td>{c.datos_usados_mb}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.estado_consumo === "pagado"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {c.estado_consumo}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No hay consumos pasados registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
