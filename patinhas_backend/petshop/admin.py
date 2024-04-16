from django.contrib import admin
from .models import Usuario, Raca, Pet, Servico, Agendamento, Especie
# Register your models here.
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = [
        "nome",
        "cpf",
        "email",
        "telefone",
        "dt_criacao",
        "dt_atualizacao",
    ]
    search_fields = ("nome", "cpf", "email")
    exclude= ["senha"]
    list_per_page = 20
    
@admin.register(Especie)
class EspecieAdmin(admin.ModelAdmin):
    list_display = ['especie', 'dt_criacao', 'dt_atualizacao']
    search_fields = ('especie',)
    list_per_page = 20
    
@admin.register(Raca)
class RacaAdmin(admin.ModelAdmin):
    list_display = [
        "raca",
        "especie",
        "dt_criacao",
        "dt_atualizacao",
    ]
    search_fields = ("raca",)
    list_per_page = 20

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = [
        "nome",
        "especie",
        "id_raca",
        "id_usuario",
        "dt_nascimento",
        "dt_criacao",
        "dt_atualizacao",
    ]
    search_fields = ("nome", "id_usuario__nome", "id_usuario__cpf", "usuario__email")
    list_per_page = 20
    
    
@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = [
        "nome",
        "valor",
        "dt_criacao",
        "dt_atualizacao",
    ]
    search_fields = ("nome",)
    list_per_page = 20
    
    
@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = [
        "id_pet",
        "valor_total",
        "dt_inicial",
        "dt_final",
        "dt_criacao",
        "dt_atualizacao",
    ]
    search_fields = ("id_pet__nome",)
    list_per_page = 20