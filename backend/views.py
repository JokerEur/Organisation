from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from backend import database

database.db_create_tables()
# database.db_start()

@csrf_exempt
def index(request):
    database.db_start()
    print(request.POST)
    # query = request.POST.get('journal')

    return render(request, "base.html")


def api(request):
    a = []
    # return JsonResponse(a, safe=False)
    return JsonResponse({'name': 'ded'})
