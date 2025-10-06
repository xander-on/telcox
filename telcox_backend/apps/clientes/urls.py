from django.urls import path
from .views import clientes_list

urlpatterns = [
    path('', clientes_list, name='clientes_list'),        
    
]