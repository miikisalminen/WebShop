from django.urls import path, include

from django.views.generic import TemplateView

from . import views

urlpatterns = [
    # Generic paths
    path('', views.home),
    path('shop/', views.shop, name = "home"),
    path('signup/', views.signup),
    path('account/', include('django.contrib.auth.urls')),

    
    # API endpoints
    path("api/auth", views.UserView.as_view()),
]
