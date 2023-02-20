from api.models import Task
from api.serializers import TaskSerializer
from api.handlers.crud_handler import CrudHandler


class TaskHandler(CrudHandler):

    def __init__(self):
        super().__init__(Task)

    def getSerializer(self, **kwargs):
        return TaskSerializer(**kwargs)

    def getSerializerByObjects(self, objects, **kwargs):
        return TaskSerializer(objects, **kwargs)