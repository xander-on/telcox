# apps/base/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from apps.clientes.models import Cliente
from apps.planes.models import Plan, PlanCliente, Consumo
from datetime import date

@api_view(['POST'])
def seed_data(request):
    if not settings.DEBUG:
        return Response({"error": "Seed solo permitido en DEBUG"}, status=403)
    
    
    # ------------------------
    # Limpiar datos antiguos
    # ------------------------
    Consumo.objects.all().delete()
    PlanCliente.objects.all().delete()
    Plan.objects.all().delete()
    Cliente.objects.all().delete()
    

    # ------------------------
    # Crear planes
    # ------------------------
    plan_basico, _ = Plan.objects.get_or_create(
        nombre="Plan Básico",
        defaults={
            "descripcion": "Incluye 100 minutos y 1GB",
            "minutos_incluidos": 100,
            "datos_incluidos_mb": 1024,
            "precio_mensual": 10.00
        }
    )

    plan_premium, _ = Plan.objects.get_or_create(
        nombre="Plan Premium",
        defaults={
            "descripcion": "Incluye 500 minutos y 10GB",
            "minutos_incluidos": 500,
            "datos_incluidos_mb": 10240,
            "precio_mensual": 25.00
        }
    )

    # ------------------------
    # Crear clientes
    # ------------------------
    cliente1, _ = Cliente.objects.get_or_create(
        documento="1234567890",
        defaults={
            "nombre": "Juan Pérez",
            "email": "juan@example.com",
            "telefono": "0999999999"
        }
    )

    cliente2, _ = Cliente.objects.get_or_create(
        documento="9876543210",
        defaults={
            "nombre": "Ana Gómez",
            "email": "ana@example.com",
            "telefono": "0888888888"
        }
    )

    # ------------------------
    # Asociar clientes a planes
    # ------------------------
    plan_cliente1, _ = PlanCliente.objects.get_or_create(
        cliente=cliente1,
        plan=plan_basico,
        celular_asociado="0994131337",
        defaults={"estado": "activo"}
    )

    plan_cliente2, _ = PlanCliente.objects.get_or_create(
        cliente=cliente2,
        plan=plan_premium,
        celular_asociado="0987654321",
        defaults={"estado": "activo"}
    )

    plan_cliente3, _ = PlanCliente.objects.get_or_create(
        cliente=cliente2,
        plan=plan_basico,
        celular_asociado="0912345678",
        defaults={"estado": "activo"}
    )

    # ------------------------
    # Función para crear consumos por periodos
    # ------------------------
    def crear_consumos_periodo(plan_cliente, inicio, fin, minutos, datos, sms):
        Consumo.objects.get_or_create(
            plan_cliente=plan_cliente,
            fecha_inicio=inicio,
            fecha_fin=fin,
            defaults={
                "minutos_usados": minutos,
                "datos_usados_mb": datos,
                "sms_usados": sms,
                "estado_consumo": "pagado"
            }
        )

    # ------------------------
    # Crear consumos para plan_cliente1
    # Periodos: 4-junio al 3-julio, 4-julio al 3-agosto, etc.
    # ------------------------
    periodos = [
        (date(2025, 6, 4), date(2025, 7, 3)),
        (date(2025, 7, 4), date(2025, 8, 3)),
        (date(2025, 8, 4), date(2025, 9, 3)),
        (date(2025, 9, 4), date(2025, 10, 3)),
        (date(2025, 10, 4), date(2025, 11, 3)),
    ]

    for inicio, fin in periodos:
        crear_consumos_periodo(plan_cliente1, inicio, fin, minutos=20, datos=500, sms=5)

    # ------------------------
    # Crear consumos para plan_cliente2 (inicio 6 de junio)
    # ------------------------
    periodos2 = [
        (date(2025, 6, 6), date(2025, 7, 5)),
        (date(2025, 7, 6), date(2025, 8, 5)),
        (date(2025, 8, 6), date(2025, 9, 5)),
        (date(2025, 9, 6), date(2025, 10, 5)),
        (date(2025, 10, 6), date(2025, 11, 5)),
    ]

    for inicio, fin in periodos2:
        crear_consumos_periodo(plan_cliente2, inicio, fin, minutos=150, datos=2048, sms=10)

    # ------------------------
    # Crear consumos para plan_cliente3 (otro plan del mismo cliente)
    # ------------------------
    for inicio, fin in periodos:
        crear_consumos_periodo(plan_cliente3, inicio, fin, minutos=50, datos=1024, sms=2)

    return Response({"message": "✅ Datos de prueba creados con consumos históricos"})
