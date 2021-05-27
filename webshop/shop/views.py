from django.shortcuts import render
import json

from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *

from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from rest_framework import generics

def home(request):
    return render(request, 'templates/shop/main.html')

def shop(request):
    return render(request, 'build/index.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'templates/shop/signup.html', {'form': form})

class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        return Response(request.user.username)
