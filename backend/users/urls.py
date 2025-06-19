from django.urls import path
from .views import ProfileView, AllProfiles, VarFields, VarLinks

urlpatterns = [
    path('profile/', ProfileView.as_view(), name = 'profile-create'),
    path('profile/<int:id>/', ProfileView.as_view(), name = 'profile-update-detail'),
    path('profiles/', AllProfiles.as_view(), name = 'all-profiles'),
    path('fields/choices/', VarFields.as_view(), name = 'fields-choices'),
    path('links/types/', VarLinks.as_view(), name = 'links-types'),
]

