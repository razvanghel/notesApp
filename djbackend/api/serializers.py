from rest_framework.serializers import ModelSerializer
from .models import *

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskProjectSerializer(ModelSerializer):
    class Meta:
        model = TaskProject
        fields = '__all__'