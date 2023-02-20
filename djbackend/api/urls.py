from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('api/tasks/', views.getTasks, name="tasks"),
    path('api/tasks/<str:pk>/', views.getTask, name="task"),
    path('api/projects/', views.getTaskProjects, name="projects"),
    path('api/projects/<str:pk>/', views.getTaskProject, name="project"),
]