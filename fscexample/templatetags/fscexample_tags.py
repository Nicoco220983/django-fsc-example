import datetime
from django import template
from django.utils.html import escape
from .. import views

register = template.Library()

@register.simple_tag
def fsc_example_content(key):
    return views.AjaxDataView.get_data(key)