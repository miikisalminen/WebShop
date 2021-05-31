from django.shortcuts import render
import json
import random

from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from .forms import AccountRegisterForm

from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from rest_framework import generics


# Landing page
def home(request):
    # If the user is authenticated, and tries to access the landing page
    # redirect them to the shop page.
    if(request.user.is_authenticated):
        return redirect('shop')
    # Otherwise render the landing page
    else:
        # Get the amount of listings
        listing_count = Listing.objects.count()

        return render(request, 'templates/shop/main.html', {'listing_count':listing_count})

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
            return redirect('shop')
    else:
        form = AccountRegisterForm()
    return render(request, 'templates/registration/signup.html', {'form': form})

# Population of database
def populate(request):

    # A bit of fun
    with open("shop/subst.txt", "r") as file:
        allText = file.read()
        subst = list(map(str, allText.split()))

    with open("shop/adj.txt", "r") as file:
        allText = file.read()
        adj = list(map(str, allText.split()))


    # Flush the listings model
    Listing.objects.all().delete()

    #Flush user model (except superuser)
    for user in User.objects.all():
        if not (user.is_superuser):
            user.delete()
    
    # Creating 3 non-selling users
    User.objects.create(username="testuser1", password="pass1", email="testuser1@shop.aa")
    User.objects.create(username="testuser2", password="pass2", email="testuser2@shop.aa")
    User.objects.create(username="testuser3", password="pass3", email="testuser3@shop.aa")

    # Creating 3 selling users with listings
    user1 = User.objects.create(username="testuser4", password="pass4", email="testuser4@shop.aa")
    user2 = User.objects.create(username="testuser5", password="pass5", email="testuser5@shop.aa")
    user3 = User.objects.create(username="testuser6", password="pass6", email="testuser6@shop.aa")

    for i in range(30):
        Listing.objects.create(title=random.choice(adj) + " " + random.choice(subst), desc="Selling a test item.", price=12, creator=User.objects.get(username="testuser4"))
        Listing.objects.create(title=random.choice(adj) + " " + random.choice(subst), desc="Selling a test item.", price=12, creator=User.objects.get(username="testuser5"))
        Listing.objects.create(title=random.choice(adj) + " " + random.choice(subst), desc="Selling a test item.", price=12, creator=User.objects.get(username="testuser6"))

    # Return to landingpage
    messages.success(request, 'Population successful!')
    return redirect('landing')

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