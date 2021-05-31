from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Listing(models.Model):
    title = models.CharField(max_length=20)
    desc = models.CharField(max_length=300)
    price = models.IntegerField(default=0)

    creator = models.ForeignKey(User, on_delete=models.CASCADE, default='')

    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title
    
