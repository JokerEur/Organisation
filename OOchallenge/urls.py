"""
URL configuration for OOchallenge project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.views.static import *
from django.conf.urls.static import static
from django.views.generic import TemplateView
from backend import views

urlpatterns = [
    path('', views.index),
    re_path('api/prot_table2', views.api_prot_table2),
    re_path('api/prot_table1', views.api_prot_table1),
    re_path('api/prot', views.api_prot),
    re_path('api/download_excel', views.download_excel, name='download_excel'),
    re_path('api/obj_table', views.api_obj_table),
    re_path('api/obj', views.api_obj),
    path('api/table', views.api_table),
    path('api/meet', views.api_meet),
    re_path('object/', views.object),
    re_path('protocol/', views.protocol)

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
