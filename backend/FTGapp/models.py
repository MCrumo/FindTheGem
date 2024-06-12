from django.db import models

# Create your models here.

#El frontend els ha de nombrar igual, els atributs de Patents
class Patent(models.Model):
    titol = models.TextField(max_length=255, blank = False) #no es pot deixar en blanc
    cos = models.TextField(blank=True, null=True) #null es que que pot ser null