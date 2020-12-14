from django.db import models
from django.utils import timezone
# Create your models here.

class LogSMS(models.Model):
    firstName = models.CharField(default="", max_length = 240)
    lastName = models.CharField(default="", max_length = 240)
    dateTime = models.DateTimeField(default = timezone.now)