# Generated by Django 3.1.1 on 2020-12-15 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserInterface', '0003_infoalarm'),
    ]

    operations = [
        migrations.AddField(
            model_name='infoalarm',
            name='alarmStatus',
            field=models.BooleanField(default=False),
        ),
    ]