from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.models import User
from .models import *

# Create your views here.

class HomePage(View):
    template_name = "Index.html"

    def get(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated == False:
            return redirect("/login/")
        return render(request, self.template_name)