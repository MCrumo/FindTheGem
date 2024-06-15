from django.db import models

# Create your models here.

#El frontend els ha de nombrar igual, els atributs de Patents
class Patent(models.Model):
    aplitactionNumber = models.TextField(max_length=255, blank = True, null = True)
    publicationNumber = models.TextField(max_length=255, blank = True, null = True)
    title = models.TextField(max_length=255, blank = True, null = True) #no es pot deixar en blanc
    status = models.TextField(max_length=255, blank = True, null = True) 
    country = models.TextField(max_length=255, blank = True, null = True) 
    grantDate = models.TextField(max_length=255, blank = True, null = True) 
    expirationDate = models.TextField(max_length=255, blank = True, null = True) 
    sizeFamily = models.TextField(max_length=255, blank = True, null = True) 
    numberCitations = models.TextField(max_length=255, blank = True, null = True) 
    score = models.TextField(max_length=255, blank = True, null = True) 
   
    # EXAMPELE cos = models.TextField(blank=True, null=True) #null es que que pot ser null