from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11)
    email = models.CharField(max_length=100)
    senha = models.CharField(max_length=100)
    telefone = models.CharField(max_length=11)
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)
    receber_notificacoes = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nome

class Especie(models.Model):
    especie = models.CharField()
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)
    def __str__(self):
        return self.especie
    
class Raca(models.Model):
    raca = models.CharField()
    especie = models.ForeignKey(to=Especie, on_delete=models.PROTECT)
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)
    def __str__(self):
        return self.raca

class Pet(models.Model):
    nome = models.CharField(max_length=100)
    dt_nascimento = models.DateTimeField()
    especie = models.ForeignKey(to=Especie, on_delete=models.PROTECT)
    id_usuario = models.ForeignKey(to=Usuario, on_delete=models.CASCADE)
    id_raca = models.ForeignKey(to=Raca, on_delete=models.PROTECT)
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)
    def __str__(self):
        return self.nome
    
class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.CharField()
    valor = models.FloatField()
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)
    def __str__(self):
        return self.nome
    
class Agendamento(models.Model):
    STATUS_CHOICES = (('agendado','Agendado'), ('cancelado','Cancelado'), ('finalizado','Finalizado'), ('nao_realizado', "Não Realizado"))
    dt_inicial = models.DateTimeField()
    dt_final = models.DateTimeField(default=None, blank=True, null=True)
    observacao = models.TextField(max_length=200, default=None, blank=True, null=True)
    valor_total = models.FloatField()
    status = models.CharField(default="Agendado", choices=STATUS_CHOICES)
    id_pet = models.ForeignKey(to=Pet, on_delete=models.CASCADE)
    id_servico = models.ManyToManyField(Servico) 
    dt_criacao = models.DateTimeField(auto_now_add=True,)
    dt_atualizacao = models.DateTimeField(auto_now=True,)   
 