import apiTelcox from "@/shared/config/apis/apiTelcox";

const getAll = async (params={}) => {
  
  try{
    const response = await apiTelcox.get('planes/consumos/', { params });
    if(!response) return null;

    const { data } = response;

    return {
      consumos: data,
    }

  }catch(error){
    console.log('error al obtener los consumos del los planes', error)
    return null;
  }
}


const getByContrato = async (contratoToken:string) => {
  
  const params = {contrato: contratoToken}
  const response = await getAll(params);

  if(!response) return null;
  const { consumos } = response;
  return consumos
}

export const consumosPlanesService = {
  getAll,
  getByContrato,
}