from django.contrib import admin

# Register your models here.
from .models import Profile, Field, Link  

admin.site.register(Profile)
admin.site.register(Field)
admin.site.register(Link)