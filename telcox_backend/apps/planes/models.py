from django.db import models
from apps.base.models import BaseModel
from datetime import timedelta

class Plan(BaseModel):
    nombre             = models.CharField(max_length=100)
    descripcion        = models.TextField(blank=True)
    minutos_incluidos  = models.IntegerField()
    datos_incluidos_mb = models.IntegerField()
    precio_mensual     = models.DecimalField(max_digits=10, decimal_places=2)
    

    def __str__(self):
        return self.nombre



ESTADO_CHOICES = [
    ('activo', 'Activo'),
    ('suspendido', 'Suspendido'),
    ('cancelado', 'Cancelado')
]
class PlanCliente(BaseModel):
    cliente          = models.ForeignKey("clientes.Cliente", on_delete=models.CASCADE, related_name="planes_cliente")
    plan             = models.ForeignKey("planes.Plan", on_delete=models.CASCADE, related_name="planes_cliente")
    celular_asociado = models.CharField(max_length=20, blank=True, null=True)
    fecha_inicio     = models.DateField(auto_now_add=True)
    fecha_fin        = models.DateField(null=True, blank=True)
    estado           = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    
    def __str__(self):
        return f"{self.cliente} - {self.plan} ({self.estado})"

    

ESTADO_CONSUMO = [
    ('pendiente', 'Pendiente'),
    ('pagado', 'Pagado'),
    ('anulado', 'Anulado')
]
class Consumo(BaseModel):
    plan_cliente    = models.ForeignKey(PlanCliente, on_delete=models.CASCADE, related_name="consumos")
    minutos_usados  = models.IntegerField(default=0)
    datos_usados_mb = models.IntegerField(default=0)
    sms_usados      = models.IntegerField(default=0)
    fecha_inicio    = models.DateField()
    fecha_fin       = models.DateField(blank=True, null=True)
    estado_consumo  = models.CharField(max_length=20, choices=ESTADO_CONSUMO, default='pendiente')
        
    def save(self, *args, **kwargs):
        if not self.fecha_fin:
            self.fecha_fin = self.fecha_inicio + timedelta(days=30)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.plan_cliente.cliente.nombre} - {self.plan_cliente.plan.nombre} ({self.fecha_inicio} a {self.fecha_fin})"
