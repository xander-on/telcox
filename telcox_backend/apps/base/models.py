from django.db import models
import uuid

class BaseModel(models.Model):
    fecha_creacion      = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado              = models.BooleanField(default=True)
    token               = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        abstract = True  # esto indica que no se crea una tabla para BaseModel
