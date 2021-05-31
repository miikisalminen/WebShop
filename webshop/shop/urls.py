from django.urls import path, include

from django.views.generic import TemplateView

from . import views

urlpatterns = [
    # Generic paths
    path('', views.home, name="landing"),
    path('shop/', views.shop, name = "shop"),
    path('signup/', views.signup),
    path('account/', include('django.contrib.auth.urls')),

    # DB Population endpoint
    path('populate/', views.populate),
    # API endpoints
    path("api/auth", views.UserView.as_view()),
]
