# Generated by Django 3.1.4 on 2020-12-14 14:23

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LogSMS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(default='', max_length=240)),
                ('lastName', models.CharField(default='', max_length=240)),
                ('dateTime', models.DateTimeField(default=datetime.datetime(2020, 12, 14, 14, 23, 5, 707440, tzinfo=utc))),
            ],
        ),
    ]
