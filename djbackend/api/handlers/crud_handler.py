from rest_framework.response import Response
from abc import abstractmethod

class CrudHandler():

    def __init__(self, model):
        self.model = model
        self.pk = self.model.getPk()
        self.order_by = self.pk

    def crudDelete(self, request, pk):
        object = self.getObjects().get(pk=pk)
        object.delete()
        return Response('Object was deleted!')

    def crudGet(self, request):
        objects = self.getObjects()
        serializer = self.getSerializerByObjects(objects, many = True)
        return Response(serializer.data)

    def crudCreate(self, request):
        serializer = self.getSerializer(data = request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(f"Error: {serializer.errors}")

    def crudUpdate(self, request, pk):
        data = request.data
        object = self.getObjects().get(pk=pk)
        serializer = self.getSerializer(instance=object, data=data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def crudDetail(self, request, pk):
        objects = self.getObjects().get(pk=pk)
        serializer = self.getSerializerByObjects(objects, many=False)
        return Response(serializer.data)
    
    def getObjects(self):
        return self.model.objects

    @abstractmethod
    def getSerializer(self, **kwargs):
        pass

    @abstractmethod
    def getSerializerByObjects(self, objects, **kwargs):
        pass