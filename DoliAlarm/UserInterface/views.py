from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from .models import *
import requests

# Create your views here.
def sendSMSAlarm(request, action, info):
    # return "ok"
    url = "https://smsapi.free-mobile.fr/sendmsg?user=" + info.userLogin + "&pass=" + info.userPassword + "&msg=" + info.alarmPassword + action + "#"
    print(url)
    result = requests.post(url)
    if result.status_code == 200:
        print("ok")
        LogSMS.objects.create(firstName=request.user.first_name, lastName=request.user.last_name, responseStatus="200")
        if (action == "1"):
            InfoAlarm.objects.update(alarmStatus= True)
        else:
            InfoAlarm.objects.update(alarmStatus= False)
        return "ok"
    LogSMS.objects.create(firstName=request.user.first_name, lastName=request.user.last_name, responseStatus=str(result.status_code))
    print("ko")
    return "ko"

class HomePage(View):
    template_name = "Index.html"

    def get(self, request):
        if request.user.is_authenticated == False:
            return redirect("/login/")
        return render(request, self.template_name)

    def post(self, request):
        try:
            CurrentInfo = InfoAlarm.objects.all().first()
            if (CurrentInfo.alarmStatus == False):
                val = sendSMSAlarm(request, '1', CurrentInfo)
                if val == "ko":
                    return JsonResponse({"status": "ko", "message": "please send " + CurrentInfo.alarmPassword + "#Arm to this number:" + str(CurrentInfo.phoneNumber)})
            else:
                val = sendSMSAlarm(request, '0', CurrentInfo)
                if val == "ko":
                    return JsonResponse({"status": "ko", "message": "please send " + CurrentInfo.alarmPassword + "#Disarm to this number:" + str(CurrentInfo.phoneNumber)})
            return JsonResponse({"status": "ok"})
        except Exception as e:
            return JsonResponse({"status": 'ko', "message": str(e)})