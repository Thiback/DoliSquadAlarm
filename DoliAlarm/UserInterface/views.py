from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
import datetime
from .models import *
import requests
import os
import subprocess

# Create your views here.
def sendSMSAlarm(request, action, info):
    # return "ok"

    #working
    url = 'curl -F "username=piriou.benoit@hotmail.fr"  -F "token=7cae1e6a-3600-4845-aefe-a17904c5d801" -F "msisdn=882360011408502" -F "iccid=8944500301200277000" -F "message=' + info.alarmPassword + action + '#"  "https://api.thingsmobile.com/services/business-api/sendSms"'
    
    out = subprocess.run(url, shell=True, check=True, capture_output=True)
    print(out)
    print(out.stdout)
    print(type(out))
    # if result.status_code == 200:
    if "<done>true</done>" in str(out.stdout, 'utf-8'):
        print("ok")
        LogSMS.objects.create(firstName=request.user.first_name, lastName=request.user.last_name, responseStatus="200")
        if (action == "1"):
            InfoAlarm.objects.update(alarmStatus= True)
        else:
            InfoAlarm.objects.update(alarmStatus= False)
        return "ok"
    LogSMS.objects.create(firstName=request.user.first_name, lastName=request.user.last_name, responseStatus="Error")
    print("ko")
    return "ko"

def cleanAccounts():
    users = User.objects.all().filter(is_superuser=False)
    date = datetime.datetime.now(timezone.utc)- datetime.timedelta(seconds=30)

    for user in users:
        print(str(type(user.date_joined)) + " date_joined " + str(user.date_joined))
        print(str(type(date)) + " date " + str(date))
        if user.date_joined < date:
            user.delete()

class HomePage(View):
    template_name = "Index.html"

    def get(self, request):
        cleanAccounts()
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

class Register(View):
    template_name = "register.html"

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        Email = request.POST.get("Email", None)
        Password = request.POST.get("Password", None)
        FirstName = request.POST.get("FirstName", None)
        LastName = request.POST.get("LastName", None)
        try:
            User.objects.create_user(Email, email=Email, password=Password, first_name=FirstName, last_name=LastName)
            return JsonResponse({'status': 'ok', 'message': "Account created"})
        except Exception as e:
            return JsonResponse({'status': 'ko', 'message': str(e)})