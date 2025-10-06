import apiTelcox from "../../shared/config/apis/apiTelcox";


const getAll = async (params={}) => {
  
  try{
    const response = await apiTelcox.get('planes/planes_clientes/', { params });
    if(!response) return null;

    const { data } = response;
    return {
      planesCliente: data,
    }

  }catch(error){
    console.log('error al obtener los planes del cliente', error)
    return null;
  }
}


const getByCliente = async (clienteToken:string) => {
  
  const params = {cliente: clienteToken}
  const response = await getAll(params);

  if(!response) return null;
  const { planesCliente } = response;
  return planesCliente
}

export const clientePlanesService = {
  getAll,
  getByCliente
}