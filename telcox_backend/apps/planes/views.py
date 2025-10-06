from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Plan, PlanCliente, Consumo
from .serializers import PlanSerializer, PlanClienteSerializer, ConsumoSerializer


@api_view(['GET'])
def planes_list(request):
    planes = Plan.objects.all()
    serializer = PlanSerializer(planes, many=True)
    return Response(serializer.data)




@api_view(['GET'])
def planes_clientes_list(request):
    
    #params
    cliente_token = request.query_params.get('cliente')
    
    planes_clientes = PlanCliente.objects.select_related('plan', 'cliente').all()
    
    if cliente_token:
        planes_clientes = planes_clientes.filter(cliente__token=cliente_token)
        
        
    serializer = PlanClienteSerializer(planes_clientes, many=True)
    return Response(serializer.data)




@api_view(['GET'])
def consumos_list(request):
    
    #params
    contrato_token = request.query_params.get('contrato')
    
    consumos = Consumo.objects.all()
    
    if contrato_token:
        consumos = Consumo.objects.filter(plan_cliente__token=contrato_token)
    
    serializer = ConsumoSerializer(consumos, many=True)
    return Response(serializer.data)