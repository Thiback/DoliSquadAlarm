# Generated by Django 3.1.4 on 2020-12-15 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserInterface', '0004_infoalarm_alarmstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='logsms',
            name='responseStatus',
            field=models.CharField(default='ko', max_length=240),
        ),
    ]
