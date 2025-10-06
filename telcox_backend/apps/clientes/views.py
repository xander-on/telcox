from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.clientes.models import Cliente
from apps.clientes.serializers import ClienteSerializer

@api_view(['GET'])
def clientes_list(request):
    clientes = Cliente.objects.all()
    serializer = ClienteSerializer(clientes, many=True)
    return Response(serializer.data)
