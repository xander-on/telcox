from django.db import models
from apps.base.models import BaseModel 

class Cliente(BaseModel):
    nombre    = models.CharField(max_length=100)
    email     = models.EmailField(unique=True)
    telefono  = models.CharField(max_length=20)
    documento = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.nombre} ({self.documento})"
