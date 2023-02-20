from api.models import TaskProject, Task
from api.serializers import TaskProjectSerializer, TaskSerializer
from api.handlers.crud_handler import CrudHandler
from rest_framework.response import Response

class TaskProjectHandler(CrudHandler):

    def __init__(self):
        super().__init__(TaskProject)

    def getSerializer(self, **kwargs):
        return TaskProjectSerializer(**kwargs)

    def getSerializerByObjects(self, objects, **kwargs):
        return TaskProjectSerializer(objects, **kwargs)

    def crudDetail(self, request, pk):
        try:
            self.getObjects().get(pk = pk)
            tasks = Task.objects.filter(project = pk)
            serializer = TaskSerializer(tasks, many = True)
            return Response(serializer.data)
        except:
            return Response("Project not exists")
        
    def crudUpdate(self, request, pk):
        self.getObjects().filter(pk=pk).update(name=request.data["name"])
        return Response("Object updated!")