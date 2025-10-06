import apiTelcox from "@/shared/config/apis/apiTelcox";



const getAll = async() => {

  try{
    const response = await apiTelcox.get('clientes/');
    if(!response) return null;

    const { data } = response;

    return {
      clientes: data,
    }

  }catch(error){
    console.log('error al obtener los clientes', error);
    return null;
  }
}


export const clientesService = {
  getAll,
}