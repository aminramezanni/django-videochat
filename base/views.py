from django.http import JsonResponse
from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.views.decorators.csrf import csrf_exempt
from .models import RoomMember
import random
import time
import json


def lobby(request):
    return render(request, 'base/lobby.html')


def room(request):
    return render(request, 'base/room.html')


def get_token(request):
    appId = 'Your App Id'
    appCertificate = 'Your App Certificate'
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expiration_time_seconds = 3600
    current_time_stamp = int(time.time())
    privilegeExpiredTs = current_time_stamp + expiration_time_seconds
    role = 1
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token': token, 'uid': uid}, safe=False)


@csrf_exempt
def create_member(request):
    data = json.loads(request.body)

    member, created = RoomMember.objects.get_or_create(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )
    return JsonResponse({'name': data['name']}, safe=False)


def get_member(request):
    uid = request.GET.get('uid')
    room_name = request.GET.get('room_name')

    member = RoomMember.objects.get(
        uid=uid,
        room_name=room_name
    )
    name = member.name

    return JsonResponse({'name': member.name}, safe=False)


@csrf_exempt
def delete_member(request):
    data = json.loads(request.body)

    member = RoomMember.objects.get(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )
    member.delete()
    return JsonResponse('Member was deleted', safe=False)
