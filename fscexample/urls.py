from django.urls import path
from . import views

urlpatterns = [
    path('_ajax/data/<str:key>', views.AjaxDataView.as_view(), name='ajax'),
]