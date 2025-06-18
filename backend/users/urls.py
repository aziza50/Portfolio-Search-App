from django.urls import path
from .views import ProfileView, AllProfiles, GetFields, GetLinks, VarFields

urlpatterns = [
    path('profile/', ProfileView.as_view(), name = 'profile-create'),
    path('profile/<int:id>/', ProfileView.as_view(), name = 'profile-update-detail'),
    path('profiles/', AllProfiles.as_view(), name = 'all-profiles'),
    path('profiles/<int:id>/fields/', GetFields.as_view(), name = 'all-profile-fields'),
    path('profiles/fields/', GetFields.as_view(), name = 'all-fields'),
    path('profiles/<int:id>/links/', GetLinks.as_view(), name = 'profile-links'),
    path('fields/choices/', VarFields.as_view(), name = 'fields-choices')
]

