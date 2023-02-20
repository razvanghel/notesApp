from rest_framework.decorators import api_view
from .utils import *
from .handlers.task_handler import TaskHandler
from .handlers.task_project_handler import TaskProjectHandler
from rest_framework.response import Response

taskHandler = TaskHandler()
taskProjectHandler = TaskProjectHandler()

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/tasks/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/tasks/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/tasks/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET', 'PUT', 'DELETE'])
def getTask(request, pk):
    return requestHandleForOne(request, pk, taskHandler)

@api_view(['GET', 'POST'])
def getTasks(request):
    return requestHandle(request, taskHandler)

@api_view(['GET', 'PUT', 'DELETE'])
def getTaskProject(request, pk):
    if request.method == "DELETE" and pk.lower() == "inbox":
        return Response('Project "Inbox" cannot be deleted.')
    return requestHandleForOne(request, pk, taskProjectHandler)

@api_view(['GET', 'POST'])
def getTaskProjects(request):
    return requestHandle(request, taskProjectHandler)
