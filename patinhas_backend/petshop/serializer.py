from rest_framework import serializers


class UsuarioSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nome = serializers.CharField()
    email = serializers.CharField()
    cpf = serializers.CharField()
    telefone = serializers.CharField()
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()
    receber_notificacoes = serializers.BooleanField()
        

class PetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nome = serializers.CharField()
    raca = serializers.CharField(source="id_raca.raca")
    usuario = serializers.CharField(source="id_usuario.nome")
    dt_nascimento = serializers.DateTimeField()
    especie = serializers.CharField(source="especie.especie")
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()
        
class EspecieSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    especie = serializers.CharField()
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()

class RacaSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    raca = serializers.CharField()
    especie = serializers.CharField(source="especie.especie")
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()

class ServicoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nome = serializers.CharField()
    valor = serializers.FloatField()
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()
    
class AgendamentoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    dt_inicial = serializers.DateTimeField()
    dt_final = serializers.DateTimeField()
    observacao = serializers.CharField()
    valor_total = serializers.FloatField()
    pet = serializers.CharField(source="id_pet.nome")
    id_servico = ServicoSerializer(many=True, read_only=True)
    status = serializers.CharField()
    dt_criacao = serializers.DateTimeField()
    dt_atualizacao = serializers.DateTimeField()   
    
