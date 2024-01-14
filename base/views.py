from django.http import JsonResponse
from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
import random
import time

def get_token(request):
    appId = '63854ba40540452badce03ec59f8eb8d'
    appCertificate = '3b6ee35291424292a5dae0222ccb3197'
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expiration_time_seconds = 3600 * 24
    current_time_stamp = time.time()
    privilegeExpiredTs = current_time_stamp + expiration_time_seconds
    role = 1
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token': token, 'uid': uid}, safe=False)


def lobby(request):
    return render(request, 'base/lobby.html', {})


def room(request):
    return render(request, 'base/room.html', {})
