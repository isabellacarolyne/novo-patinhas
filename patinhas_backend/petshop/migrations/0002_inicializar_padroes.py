from django.db import migrations

def cria_raca_especies_padroes(apps, schema_editor):
    Raca = apps.get_model('petshop', 'Raca')
    Especie = apps.get_model('petshop', 'Especie')
    
    valores_padroes = [
    {
      "especie": "Cachorro",
      "racas": [
        "Labrador",
        "Bulldog",
        "Poodle",
        "Golden Retriever",
        "Boxer",
        "Dálmata",
        "Chihuahua",
        "Husky",
        "Rottweiler",
        "Shih Tzu",
        "Beagle",
        "Pug",
        "Doberman",
        "Border Collie",
        "Schnauzer"
      ]
    },
    {
      "especie": "Gato",
      "racas": [
        "Persa",
        "Siamese",
        "Maine Coon",
        "Bengal",
        "Ragdoll",
        "Sphynx",
        "Scottish Fold",
        "Burmese",
        "Exótico",
        "Norwegian Forest Cat",
        "Siberian",
        "British Shorthair",
        "Abyssinian",
        "Oriental",
        "Tonkinese"
      ]
    },
    {
      "especie": "Pássaro",
      "racas": [
        "Canário",
        "Pardal",
        "Papagaio",
        "Coruja",
        "Periquito",
        "Arara",
        "Gavião",
        "Pato",
        "Pinguim",
        "Águia",
        "Tucano",
        "Falcão",
        "Andorinha",
        "Pomba",
        "Flamingo"
      ]
    },
    {
      "especie": "Peixe",
      "racas": [
        "Beta",
        "Guppy",
        "Tetra",
        "Pacu",
        "Dourado",
        "Acará",
        "Corydora",
        "Carpa",
        "Salmão",
        "Atum",
        "Betta Splendens",
        "Molly",
        "Platy",
        "Neon Tetra",
        "Peixe Palhaço"
      ]
    },
    {
      "especie": "Réptil",
      "racas": [
        "Tartaruga",
        "Iguana",
        "Cobra",
        "Lagarto",
        "Crocodilo",
        "Camaleão",
        "Dragão-barbudo",
        "Tiranossauro",
        "Anfisbena",
        "Gecko",
        "Jiboia",
        "Varano",
        "Tartaruga-de-ouvido-vermelho",
        "Cágado",
        "Iguana Marinha"
      ]
    },
    {
      "especie": "Coelho",
      "racas": [
        "Holandês",
        "Angorá",
        "Lion Head",
        "Chinchila",
        "Flemish Giant",
        "Mini Rex",
        "Mini Lop",
        "Holland Lop",
        "Rex",
        "Californiano",
        "Himalaio",
        "Mini Satin",
        "Belier",
        "Harlequin",
        "Cashmere Lop"
      ]
    },
    {
      "especie": "Cavalo",
      "racas": [
        "Quarto de Milha",
        "Puro Sangue Inglês",
        "Appaloosa",
        "Árabe",
        "Paint Horse",
        "Clydesdale",
        "Shetland",
        "Frisão",
        "Mustangue",
        "Hanoveriano",
        "Andaluz",
        "Lusitano",
        "Fjord",
        "Tennessee Walker",
        "Gypsy Vanner"
      ]
    },
    {
      "especie": "Hamster",
      "racas": [
        "Sírio",
        "Anão Russo",
        "Chinês",
        "Roborovski",
        "Djungarian",
        "Siberiano",
        "Campbell",
        "Robski",
        "Winter White",
        "Angorá",
        "Teddy Bear",
        "Panda",
        "Pearl",
        "Argente",
        "Campbell Albino"
      ]
    }
  ]
    
    for especie in valores_padroes:
        nova_especie = Especie.objects.create(especie=especie['especie'])
        
        for raca in especie['racas']:
            Raca.objects.create(raca=raca, especie=nova_especie)


def cria_servicos_padroes(apps, schema_editor):
    Servico = apps.get_model('petshop', 'Servico')
    
    servicos = [
      {
        "nome": "Consulta Veterinária",
        "descricao": "Exame físico e diagnóstico básico.",
        "preco": 80.00
      },
      {
        "nome": "Vacinação",
        "descricao": "Vacinação anual (V8 ou V10 para cães, tríplice para gatos).",
        "preco": 60.00
      },
      {
        "nome": "Cirurgia de Esterilização",
        "descricao": "Castração para cães ou gatos.",
        "preco": 150.00
      },
      {
        "nome": "Hospedagem Diária",
        "descricao": "Hospedagem com alimentação inclusa.",
        "preco": 50.00
      },
      {
        "nome": "Banho e Tosa",
        "descricao": "Banho, secagem, tosa higiênica.",
        "preco": 40.00
      },
      {
        "nome": "Passeios Diários",
        "descricao": "Passeios regulares para cães.",
        "preco": 20.00
      },
      {
        "nome": "Atendimento Emergencial 24 horas",
        "descricao": "Consulta veterinária de emergência.",
        "preco": 120.00
      },
      {
        "nome": "Exames Laboratoriais",
        "descricao": "Inclui hemograma, exames de urina e bioquímica sanguínea.",
        "preco": 100.00
      },
      {
        "nome": "Hemograma",
        "descricao": "Avaliação completa das células sanguíneas.",
        "preco": 40.00
      },
      {
        "nome": "Exame de Urina",
        "descricao": "Análise detalhada da urina.",
        "preco": 30.00
      },
      {
        "nome": "Bioquímica Sanguínea",
        "descricao": "Avaliação de enzimas e metabólitos no sangue.",
        "preco": 50.00
      },
      {
        "nome": "Radiografia",
        "descricao": "Imagens radiográficas para diagnóstico.",
        "preco": 80.00
      },
      {
        "nome": "Ultrassonografia",
        "descricao": "Imagens por ultrassom para diagnóstico.",
        "preco": 120.00
      },
      {
        "nome": "Endoscopia",
        "descricao": "Exame visual interno usando endoscópio.",
        "preco": 150.00
      },
      {
        "nome": "Eletrocardiograma",
        "descricao": "Avaliação elétrica do coração.",
        "preco": 60.00
      },
      {
        "nome": "Citologia",
        "descricao": "Avaliação de células para diagnóstico de tumores.",
        "preco": 70.00
      },
      {
        "nome": "Teste de Fezes",
        "descricao": "Análise de fezes para parasitas.",
        "preco": 25.00
      },
      {
        "nome": "Cultura Bacteriana",
        "descricao": "Cultivo de bactérias para diagnóstico.",
        "preco": 45.00
      },
      {
        "nome": "Teste de FIV/FeLV",
        "descricao": "Teste para vírus da imunodeficiência e leucemia felina.",
        "preco": 35.00
      },
      {
        "nome": "Monitoramento da Pressão Arterial",
        "descricao": "Avaliação da pressão arterial.",
        "preco": 55.00
      }
    ]
    
    for servico in servicos:
      Servico.objects.create(nome=servico['nome'], descricao=servico['descricao'], valor=servico['preco'])

    
    


class Migration(migrations.Migration):

    dependencies = [
        ('petshop', '0001_initial'),  
    ]

    operations = [
        migrations.RunPython(cria_raca_especies_padroes),
        migrations.RunPython(cria_servicos_padroes),
    ]