import json

from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import Data
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class AjaxDataView(View):

    def get(self, request, key):
        data = self.get_data(key)
        content = data.content if data else ''
        return JsonResponse({'content':content})
    
    def post(self, request, key):
        data = json.loads(request.body)
        Data.objects.update_or_create(
            key=key, defaults={"content": data["content"]}
        )
        return JsonResponse({"done": True})
    
    @staticmethod
    def get_data(key):
        return Data.objects.filter(key=key).first()