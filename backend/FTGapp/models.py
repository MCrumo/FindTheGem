from django.db import models

# Create your models here.

#El frontend els ha de nombrar igual, els atributs de Patents
class Patent(models.Model):
    aplitactionNumber = models.TextField(max_length=32, blank = False)
    publicationNumber = models.TextField(max_length=32, blank = False)
    title = models.TextField(max_length=32, blank = False) #no es pot deixar en blanc
    status = models.TextField(max_length=32, blank = False) 
    country = models.TextField(max_length=32, blank = False) 
    grantDate = models.TextField(max_length=32, blank = False) 
    expirationDate = models.TextField(max_length=32, blank = False) 
    sizeFamily = models.TextField(max_length=32, blank = False) 
    numberCitations = models.TextField(max_length=32, blank = False) 
    score = models.TextField(max_length=64, blank = False) 
   
    # EXAMPELE cos = models.TextField(blank=True, null=True) #null es que que pot ser null