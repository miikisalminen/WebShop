# Generated by Django 3.2.3 on 2021-07-30 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0013_alter_listing_desc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='listings',
        ),
        migrations.AddField(
            model_name='cart',
            name='listings',
            field=models.ManyToManyField(null=True, to='shop.Listing'),
        ),
    ]
