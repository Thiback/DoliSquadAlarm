from django.db import models
from django.utils import timezone
# Create your models here.

class LogSMS(models.Model):
    firstName = models.CharField(default="", max_length = 240)
    lastName = models.CharField(default="", max_length = 240)
    dateTime = models.DateTimeField(default = timezone.now)
    responseStatus = models.CharField(default="ko", max_length=240)

class InfoAlarm(models.Model):
    phoneNumber = models.CharField(blank= False, max_length=240)
    alarmPassword = models.CharField(blank= False, max_length=240)
    userLogin = models.CharField(blank= False, max_length=240)
    userPassword = models.CharField(blank= False, max_length=240)
    alarmStatus = models.BooleanField(default=False)