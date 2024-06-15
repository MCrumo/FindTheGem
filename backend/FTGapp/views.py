from django.shortcuts import render, HttpResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from models import Patent
from .serializers import PatentSerializer
# Create your views here.

def home(request):
    return render(request, "home.html")

class PatentsViewSet(viewsets.ModelViewSet):
    queryset = Patent.objects.all()
    serializer_class = PatentSerializer
    
    # Un GET - Torna tots els elements de totes les patents que hi ha
    def list(self, request, *args, **kwargs):
        return super().list(request,args, **kwargs)
    
    # Un GET pero en concret - Torna tots els elements d'una patent en concret
    def retrieve(self, request, args, **kwargs):
        return super().retrieve(request,args, **kwargs)
    
    # 
    @action(detail=False, methods=['get'])
    def classify(self, request, pk=None):

        patents = Patent.objects.all()
        serializer = PatentSerializer(patents, many=True)
    
        # enviar aixó a la IA
        
        # resposta de la IA

        return Response(serializer.data) # respones del que m'ha tornat la IA

def initPatents(request):
    # Agafar el csv i rescatar les dades per crear aqeusta patent
    # Fer un bucle i anar-ho posant tot
    patent = Patent.objects.create(
                titol=request.data['titol'],
                cos=request.data.get('cos'),
                isLink=is_link,
                url=request.data.get('url'),
                magazine=magazinePk,
                author=author
            )
    patent.save()