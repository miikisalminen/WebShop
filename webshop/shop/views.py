from django.shortcuts import render
import json

from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from .forms import AccountRegisterForm

from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from rest_framework import generics


# Landing page
def home(request):
    return render(request, 'templates/shop/main.html')

# Shop page
def shop(request):
    return render(request, 'build/index.html')

# Account creation (Using Django's premade form)
def signup(request):
    if request.method == 'POST':
        form = AccountRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = AccountRegisterForm()
    return render(request, 'templates/registration/signup.html', {'form': form})

# --- API ENDPOINTS ---

# Fetch userdata from the REST API
class UserView(APIView):
    serializer_class = UserSerializer

    # Get username, if the requesting user is not logged in, return "Guest"
    def get(self, request):
        if(request.user.is_authenticated):
            return Response(request.user.username)
        else:
            return Response("Guest")