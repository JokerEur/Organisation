from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from backend import database, queries
from datetime import datetime, date


database.db_create_tables()

costil_id = 5

def get_object(q):
    id = q['id']
    district = q['district']
    address = q['address']
    object_type = q['object_type']
    condition = q['condition']
    owner = q['owner']
    agenda = q['agenda']
    url = q['url']
    group = q['group']
    date_of_meeting = q['date_of_meeting']

    # database.work_groups(id, name)


@csrf_exempt
def index(request):
    q = request.POST
    print(q)
    return render(request, "base.html")


@csrf_exempt
def object(request):
    global costil_id

    q = request.POST
    print(request.POST)
    description = q['description']
    group = q['group']
    deadline = q['deadline']
    id = q['id']

    wg_id = queries.get_id_group_by_name(group)
    costil_id+=1

    database.insert_task(costil_id, id, description, 'new', datetime.now(), deadline, wg_id, None, None, None)
    return render(request, "base.html")


def api(request):

    ans = [
        {'id': '1', 'district': 'Отрадное', 'address': 'Кедрова 5к1, 4 подъезд', 'object_type': 'a',
         'condition': 'новый',
         'owner': 'МИСИС', 'agenda': "5467",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'A',
         'date_of_meeting': '24.04.23'},

        {'id': '2', 'district': 'Якиманка', 'address': 'ул. Большая 14', 'object_type': 'b', 'condition': 'в работе',
         'owner': 'МИСИС', 'agenda': "50023",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'B',
         'date_of_meeting': '24.04.23'},

        {'id': '3', 'district': 'Царицыно', 'address': 'ш. Варшавское 14', 'object_type': 'а', 'condition': 'завершен',
         'owner': 'МИФИ', 'agenda': "23400",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'C',
         'date_of_meeting': '24.04.23'},

        {'id': '4', 'district': 'Царицыно', 'address': 'ш. Варшавское 33', 'object_type': 'с',
         'condition': 'новый',
         'owner': 'МИФИ', 'agenda': "1765",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'A',
         'date_of_meeting': '24.04.23'},
        {'id': '5', 'district': 'Царицыно', 'address': 'ш. Варшавское 33', 'object_type': 'с',
         'condition': 'новый',
         'owner': 'МИФИ', 'agenda': "8789", 'url': 'non', 'group': 'A', 'date_of_meeting': '24.04.23'},
        {'id': '6', 'district': 'Царицыно', 'address': 'ш. Варшавское 33', 'object_type': 'с',
         'condition': 'новый',
         'owner': 'МИФИ', 'agenda': "1765",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'A',
         'date_of_meeting': '24.04.23'},
        {'id': '7', 'district': 'Царицыно', 'address': 'ш. Варшавское 33', 'object_type': 'с',
         'condition': 'новый',
         'owner': 'МИФИ', 'agenda': "1765",
         'url': 'https://depir-vcs.mos.ru/#conference:ba1e13b7-2192-4fd1-9a4d-d1293886c1b8,true', 'group': 'A',
         'date_of_meeting': '24.04.23'},
    ]

    return JsonResponse(ans, safe=False)
    # return JsonResponse({'name': 'ded'})
