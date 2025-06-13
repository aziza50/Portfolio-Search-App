from django.db import models


class Field(models.Model):
    #Note first element is reflected on Database *
    FIELD_CHOICES = [
        ('photography', 'Photography'),
        ('fashion design', 'Fashion Design'),
        ('cinematography', 'Cinematography'),
        ('music', 'Music'),
        ('graphic design', 'Graphic Design'),
    ]
    field = models.CharField(max_length = 20, choices = FIELD_CHOICES, unique = True)

class Profile(models.Model):
    name = models.CharField(max_length = 30)
    profile_picture = models.ImageField(upload_to = 'images/', blank = True, null = True)
    bio = models.TextField(max_length = 200, blank = True)
    #profiles.fields.all() --> gives all tags a profile has ---> another possible feature idea to consider
    tags = models.ManyToManyField(Field, related_name = 'profiles')

class Link(models.Model):
    TYPES = ([
        ('instagram','Instagram'),
        ('facebook','Facebook'),
        ('linkedin','LinkedIn'),
        ('personal website', 'Personal Website'),
        ('resume','Resume'),
        ('other', 'Other'),
        ('github', 'GitHub'),
    ])
    type = models.CharField(max_length = 20, choices = TYPES)
    link = models.URLField(max_length =200)
    #related name --> profile.links.all() gives all links of that user --> check doesnt exceed 3 limit
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name = 'links')
