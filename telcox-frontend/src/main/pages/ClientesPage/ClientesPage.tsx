import { Cliente } from "@/main/interfaces";
import { clientesService } from "@/main/services";
import { useMiPortalState } from "@/store/useMiPortalState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
   const { setClienteToken, setClienteNombre } = useMiPortalState();

  const navigate = useNavigate();

  const getClientes = async () => {
    const response = await clientesService.getAll();
    if (!response) return;
    setClientes(response.clientes);
  };

  useEffect(() => {
    getClientes();
  }, []);

  const handleSelectCliente = (cliente: Cliente) => {
    setClienteToken(cliente.token);
    setClienteNombre(cliente.nombre);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>Ingresar como cliente:</h3>

      <div className="row mt-4">
        {clientes.map((c) => {
          return (
            <div
              key={c.id}
              className='selected p-4 col-4 mx-4 cursor-pointer'
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectCliente(c)}
            >
              <p className="mb-1"><strong>{c.nombre}</strong> ({c.documento})</p>
              <p className="mb-0">{c.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
