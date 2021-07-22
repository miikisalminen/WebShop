from django.urls import path, re_path, include

from django.views.generic import TemplateView

from . import views

urlpatterns = [
    # Generic paths
    path('', views.home, name="landing"),
    re_path(r'shop/(?:.*)$', views.shop, name = "shop"),
    path('signup/', views.signup),
    path('account/', include('django.contrib.auth.urls')),

    # DB Population endpoint
    path('populate/', views.populate),
    # User related endpoint (Username, Personal listings etc.)
    path("api/auth", views.UserView.as_view()),
    path("api/auth/myitems", views.UserListingView.as_view()),
    

    # General listing API endpoint
    path("api/query", views.ListingView.as_view()),
    
]
