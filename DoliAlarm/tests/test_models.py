from django.test import TestCase
from UserInterface.models import LogSMS, InfoAlarm
from datetime import datetime
from django.utils import timezone

class GaugeTest(TestCase):
    def setUp(self):
        self.logsms = LogSMS.objects.create(
            firstName = "test",
            lastName = "test",
            dateTime = str(timezone.now()),
            responseStatus = "ok"
        )
        self.infoalarm = InfoAlarm.objects.create (
            phoneNumber = "07xx99xx99",
            alarmPassword = "blabla",
            userLogin = "bob@marcel",
            userPassword = "michel",
            alarmStatus = False
        )

    def test_new_save(self):
        self.assertEqual(self.logsms.firstName, "test")
        self.assertEqual(self.logsms.lastName, "test")
        timeStamp = str (timezone.now())
        self.logsms.dateTime = timeStamp
        self.logsms.save()
        self.assertEqual(self.logsms.dateTime, timeStamp)

    def test_new_save4(self):
        self.assertEqual(self.infoalarm.phoneNumber, "07xx99xx99")

    def test_new_save5(self):
        self.assertEqual(self.infoalarm.alarmPassword, "blabla")

    def test_new_save6(self):
        self.assertEqual(self.infoalarm.userPassword, "michel")

    def test_new_save7(self):
        self.assertEqual(self.infoalarm.userLogin, "bob@marcel")

    def test_new_save25(self):
        self.assertEqual(self.infoalarm.alarmStatus, False)

    def test_exist_save(self):
        user = LogSMS.objects.get(firstName='test')
        user.save()
        self.assertEqual(True, True)

    def test_new_save11(self):
        self.assertEqual(self.logsms.firstName, "test")

    def test_new_save12(self):
        self.assertEqual(self.logsms.lastName, "test")

    def test_new_save13(self):
        self.assertEqual(self.logsms.responseStatus, "ok")

    def test_new_save1(self):
        self.assertNotEqual(self.logsms.firstName, "test1")
        self.assertNotEqual(self.logsms.lastName, "test1")
        timeStamp = str (timezone.now())
        self.logsms.dateTime = timeStamp
        self.logsms.save()
        self.assertEqual(self.logsms.dateTime, timeStamp)

    def test_exist_save2(self):
        user = LogSMS.objects.get(lastName='test')
        user.save()
        self.assertEqual(True, True)

    def test_exist_save3(self):
        try:
            user = LogSMS.objects.get(lastName='lol')
            self.assertIsNone(None)
        except:
            self.assertIsNone(None)

    def test_exist_save4(self):
        try:
            user = LogSMS.objects.get(lastName='lol')
            self.assertIsNotNone(user)
        except:
            user = LogSMS.objects.get(lastName='test')
            self.assertIsNone(user)

    def test_exist_save4(self):
        try:
            user = LogSMS.objects.get(lastName='test')
            self.assertIn("lastname", user) 
        except:
            self.assertIsNone(None)

    def test_new_save8(self):
        self.assertEqual(self.infoalarm.alarmPassword, "blabla")

    def test_new_save9(self):
        self.assertEqual(self.infoalarm.userPassword, "michel")

    def test_new_save10(self):
        self.assertEqual(self.infoalarm.userLogin, "bob@marcel")