from rest_framework import serializers
from .models import Plan, PlanCliente, Consumo

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class PlanClienteSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()
    
    class Meta:
        model = PlanCliente
        fields = '__all__'
        
        
class ConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumo
        fields = '__all__'