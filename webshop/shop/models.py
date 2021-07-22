from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Listing(models.Model):
    title = models.CharField(max_length=20)
    desc = models.CharField(max_length=30)
    price = models.IntegerField(default=0)

    creator = models.ForeignKey(User, on_delete=models.CASCADE, default='')

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title + " " + str(self.price) +"€"
    
    class Meta:
            ordering = ('-created_at',)
