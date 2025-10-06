from django.urls import path
from .views import planes_list, planes_clientes_list, consumos_list

urlpatterns = [
    path('',                 planes_list,          name='planes_list'),      
    path('planes_clientes/', planes_clientes_list, name='planes_clientes_list'), 
    path('consumos/',        consumos_list,        name='consumos-list'),
]