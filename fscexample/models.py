from django.db import models

class Data(models.Model):
    key = models.CharField(max_length=100, primary_key=True)
    content = models.TextField()
