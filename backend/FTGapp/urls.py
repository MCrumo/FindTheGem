from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home") # When we go to the "" path we are going to call the views.home function
]