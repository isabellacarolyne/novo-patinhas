from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .serializer import UsuarioSerializer, PetSerializer, RacaSerializer, EspecieSerializer, AgendamentoSerializer, ServicoSerializer
from .models import Usuario, Pet, Raca, Especie,Agendamento, Servico
from datetime import datetime
from django.shortcuts import get_object_or_404
from dateutil import parser
# Create your views here.
class UsuarioView(APIView):

    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        id_usuario = request.query_params.get("id_usuario")
        if id_usuario:
            usuario = Usuario.objects.filter(id=id_usuario).first()
            usuario_serializer = UsuarioSerializer(usuario, many=False).data
            return Response(usuario_serializer, status=200)
        else:
            
            return Response({"mensagem":"Erro ao solicitar o usuário", "status": "erro", "detalhes": "O ID do usuário não foi informado"}, status=400)
    


    def post(self, request, *args, **kwargs):
        try:
            dados = {
                "nome": request.data['nome'],
                "email": request.data['email'],
                "telefone": request.data['telefone'],
                "cpf": request.data['cpf'],
                "senha": request.data['senha']
            }
            novo_usuario_db = Usuario.objects.create(**dados)
            novo_usuario_db.save()
            usuario_criado = UsuarioSerializer(novo_usuario_db, many=False).data

            if novo_usuario_db is not None:
                novo_usuario = User.objects.create_user(username=dados['email'], email=dados['email'], password=dados['senha'])
                novo_usuario.save()
                
                if novo_usuario is not None:
                    return Response({"mensagem":"Usuário cadastrado com sucesso!", "status": "sucesso", "detalhes": usuario_criado}, status=200)
            
            return Response({"mensagem":"Erro ao criar usuário, por favor, verifique os dados", "status": "erro", "detalhes": usuario_criado}, status=400)
        except Exception as e:
            return Response({"mensagem":"Erro ao criar usuário, por favor, verifique os dados", "status": "erro", "detalhes": str(e)}, status=400)
        
    def patch(self, request, *args, **kwargs):
        try:
            id = request.data['id']
            dados = {
                "nome": request.data['nome'],
                "email": request.data['email'],
                "telefone": request.data['telefone'],
                "cpf": request.data['cpf'],
                "senha": request.data['senha']
            }
            usuario_atualizar = Usuario.objects.filter(id=id)
            qtde_atualizados = usuario_atualizar.update(**dados)
            usuario_autenticacao =  User.objects.get(username=request.data['email'])
            usuario_autenticacao.set_password(request.data['senha'])
            usuario_autenticacao.save()

            if qtde_atualizados > 0:
                return Response({'mensagem': 'Usuário atualizado com sucesso!', 'status': 'sucesso', 'detalhes': "Quantidade de pets atualizados: "+str(qtde_atualizados)}, status=200)
            else:
                return Response({'mensagem': 'Nenhum usuário foi atualizado. Por favor, tente novamente.', 'status':'erro', 'detalhes': request.data}, status=404)
        
        except Exception as e:
            return Response({'mensagem': 'Ocorreu um erro ao atualizar o usuário. Por favor, tente novamente.', 'status': 'erro', 'detalhes': str(e)}, status=400)
        
    
    def delete(self, request, *args, **kwargs):
        try:
            id = request.query_params.get("usuario_id")
      
            usuario = Usuario.objects.filter(id=id)
            
            usuario_dados = Usuario.objects.filter(id=id).first()
        
            usuario_serializer = UsuarioSerializer(usuario_dados, many=False).data
      
            usuario_autenticacao =  User.objects.get(username=usuario_serializer['email'])
           
          
            usuario_autenticacao.delete()
            usuario.delete()


            
            return Response({'mensagem': 'O usuário foi deletado com sucesso!', 'status':  'sucesso', 'detalhes': id}, status=200)
        except Exception as e:
            return Response({'mensagem': 'Ocorreu um erro ao deletar o usuário.', 'status': 'erro', 'detalhes': str(e)}, status=400)

        
class AutenticarUsuarioView(APIView):
       
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        senha = request.data['senha']
        usuario = authenticate(username=email, password=senha)
        if usuario is not None:
            if usuario.is_active:
                login(request, usuario)
                dados_usuario = Usuario.objects.filter(email=email).first()
                dados_serializer = UsuarioSerializer(dados_usuario, many=False).data

                return Response({"mensagem":"Usuário autenticado com sucesso", "status": "sucesso", "detalhes": dados_serializer}, status=200)
            else:
                return Response({"mensagem":"Erro ao autenticar o usuário, verifique entre em contato com o suporte.", "status": "erro", "detalhes": "Usuário desabilitado ou sem permissão de acesso"}, status=401)
        else:
            return Response({"mensagem":"Usuário ou senha incorretos", "status": "erro", "detalhes": "Não foi possível autenticar o usuário"}, status=401)

    

class PetView(APIView):
    
    def get(self, request, *args, **kwargs):
        id_usuario = request.query_params.get("id_usuario")
        if id_usuario:
            pets = Pet.objects.filter(id_usuario=id_usuario)
            pets_serializer = PetSerializer(pets, many=True).data
            return Response(pets_serializer, status=200)
        else:
            
            return Response({"mensagem":"Erro ao solicitar os pets cadastrados", "status": "erro", "detalhes": "O ID do usuário não foi informado"}, status=400)
    
    def post(self, request, *args, **kwargs):
        try:
            especie = Especie.objects.filter(id=int(request.data['especie'])).first()
            raca = Raca.objects.filter(id=int(request.data['id_raca'])).first()
            usuario = Usuario.objects.filter(id=int(request.data['id_usuario'])).first()
            dt_nascimento = parser.parse(request.data['dt_nascimento'])
       
            dados = {
                "nome": request.data['nome'],
                "dt_nascimento": dt_nascimento,
                "especie": especie,
                "id_usuario": usuario,
                "id_raca": raca
            }
            
            novo_pet = Pet.objects.create(**dados)
            
            dados_serializer = PetSerializer(novo_pet, many=False).data
            
            return Response({"mensagem":"Pet cadastrado com sucesso!", "status": "sucesso", "detalhes": dados_serializer}, status=200)
        except Exception as e:
            return Response({"mensagem": "Erro ao cadastrar o Pet", "status": "erro", "detalhes": str(e)}, status=400)

    def patch(self, request, *args, **kwargs):
        
        try:
            id = request.data['id']
            especie = Especie.objects.filter(id=int(request.data['especie'])).first()
            raca = Raca.objects.filter(id=int(request.data['id_raca'])).first()
            usuario = Usuario.objects.filter(id=int(request.data['id_usuario'])).first()
            dt_nascimento =  parser.parse(request.data['dt_nascimento'])

            dados = {
                "nome": request.data['nome'],
                "dt_nascimento": dt_nascimento,
                "especie": especie,
                "id_usuario": usuario,
                "id_raca": raca
            }
            pet_atualizar = Pet.objects.filter(id=id)
            qtde_atualizados = pet_atualizar.update(**dados)
            if qtde_atualizados > 0:
                return Response({'mensagem': 'Pet atualizado com sucesso!', 'status': 'sucesso', 'detalhes': "Quantidade de pets atualizados: "+str(qtde_atualizados)}, status=200)
            else:
                return Response({'mensagem': 'Nenhum pet foi atualizado. Por favor, tente novamente.', 'status':'erro', 'detalhes': request.data}, status=404)
        
        except Exception as e:
            return Response({'mensagem': 'Ocorreu um erro ao atualizar o pet. Por favor, tente novamente.', 'status': 'erro', 'detalhes': str(e)}, status=400)
        
        
    def delete(self, request, *args, **kwargs):
        try:
            id = request.query_params.get("id_pet")
            agendamentos = Agendamento.objects.filter(id_pet=id)
            agendamentos.delete()
            pet=get_object_or_404(Pet,id=id)

            pet.delete()
            
            return Response({'mensagem': 'O pet foi deletado com sucesso!', 'status':  'sucesso', 'detalhes': id}, status=200)
        except Exception as e:
            return Response({'mensagem': 'Ocorreu um erro ao deletar o pet.', 'status': 'erro', 'detalhes': str(e)}, status=400)


class RacaView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            id_especie = request.query_params.get("id_especie")
            racas = Raca.objects.filter(especie__id = id_especie)
            
            racas_serializer = RacaSerializer(racas, many=True).data
            
            return Response(racas_serializer, status=200)
        except Exception as e:
            return Response({'mensagem': "Ocorreu um erro ao listar as raças", 'status': 'erro', 'detalhes': str(e)}, status=400)
    

class EspecieView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            especies = Especie.objects.filter()
            
            especie_serializer = EspecieSerializer(especies, many=True).data
            
            return Response(especie_serializer, status=200)
        except Exception as e:
            return Response({'mensagem': "Ocorreu um erro ao listar as espécies", 'status': 'erro', 'detalhes': str(e)}, status=400)
        
class ServicosView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            servicos = Servico.objects.filter()
            
            servico_serializer = ServicoSerializer(servicos, many=True).data
            
            return Response(servico_serializer, status=200)
        except Exception as e:
            return Response({'mensagem': "Ocorreu um erro ao listar os serviços", 'status': 'erro', 'detalhes': str(e)}, status=400)
        
        
class AgendamentoView(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            id_pet = request.query_params.get("id_pet")

            agendamentos = Agendamento.objects.filter(id_pet__id = id_pet)
            
            agendamentos_serializer = AgendamentoSerializer(agendamentos, many=True).data
            
            agendamentos_categorizados = {"ativos": [], "historico": []}
            
            for agendamento in agendamentos_serializer:
                if agendamento['status'] == 'Agendado' or agendamento['status'] == 'agendado' :
                    agendamentos_categorizados['ativos'].append(agendamento)
                else: 
                    agendamentos_categorizados['historico'].append(agendamento)

            return Response(agendamentos_categorizados, status=200)
        except Exception as e:
            return Response({'mensagem': "Ocorreu um erro ao listar os agendamentos do pet.", 'status': 'erro', 'detalhes': str(e)}, status=400)
     

    def post(self, request, *args, **kwargs):
        try:
            valor_total = 0
            ids_servicos = request.data.get('id_servico', [])
            servicos = []

            for id_servico in ids_servicos:
                servico = Servico.objects.filter(id=id_servico).first()

                if servico:
                    servicos.append(servico)
                    valor_total += servico.valor
            pet_id = request.data.get('id_pet')
            pet = Pet.objects.filter(id=pet_id).first()

            if not pet:
                raise ValueError("Pet não encontrado.")
            data_inicial = parser.parse(request.data['dt_inicial'])
            data_final = None
            if request.data['dt_final'] and request.data['dt_final'] is not None and request.data['dt_final'] != '':
                data_final = parser.parse(request.data['dt_final'])
            dados = {
                "dt_inicial": data_inicial,
                "dt_final": data_final,
                "observacao": request.data.get('observacao', ''),
                "valor_total": valor_total,
                "status": "agendado",
                "id_pet": pet,
            }

            novo_agendamento = Agendamento.objects.create(**dados)

          
            novo_agendamento.id_servico.set(servicos)


            
            return Response({'mensagem': "Seu agendamento foi efetuado com sucesso!", 'status': 'sucesso', 'detalhes': ''}, status=200)
        except Exception as e:
            return Response({'mensagem': "Ocorreu um erro ao cadastrar os agendamentos do pet.", 'status': 'erro', 'detalhes': str(e)}, status=400)
        
    def patch(self, request, *args, **kwargs):
        try:
            
           
            if 'status' in request.data:
                status = request.data['status']

            dados = {
                "status": request.data['status'],
            }
                        
            agendamento_atualizar_obj = Agendamento.objects.filter(id=int(request.data['id']))
            agendamento_atualizar_obj.update(**dados)

            return Response({'mensagem': 'Agendamento atualizado com sucesso!', status: 'sucesso', 'detalhes': ''}, status=200)
          
        except Exception as e:
            return Response({'mensagem': 'Ocorreu um erro ao atualizar o agendamento. Por favor, tente novamente.', 'status': 'erro', 'detalhes': str(e)}, status=400)