from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def index(request):
    print(request.POST)
    query = request.POST.get('journal')
    if query:
        print('query:', query)

    return render(request, "base.html")