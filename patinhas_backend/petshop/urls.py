from django.urls import path

from . import views

urlpatterns = [
    path(
        "api/petshop/usuario",
        views.UsuarioView.as_view(),
        name="criar-usuario",
    ),
    path(
        "api/petshop/autenticar-usuario",
        views.AutenticarUsuarioView.as_view(),
        name="autenticar-usuario",
    ),
    path(
        "api/petshop/pet",
        views.PetView.as_view(),
        name="pet",
    ),
    path(
        "api/petshop/raca",
        views.RacaView.as_view(),
        name="autenticar-usuario",
    ),
    path(
        "api/petshop/especie",
        views.EspecieView.as_view(),
        name="especie",
    ),
    path(
        "api/petshop/servicos",
        views.ServicosView.as_view(),
        name="servicos",
    ),
    path(
        "api/petshop/agendamento",
        views.AgendamentoView.as_view(),
        name="agendamento",
    ),
    
    
]
