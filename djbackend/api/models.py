from django.db import models

class TaskProject(models.Model):
    
    name = models.TextField(primary_key = True, default = "Inbox")

    def __str__(self):
        return self.name

    @staticmethod
    def getPk():
        return "name"

class Task(models.Model):

    title = models.TextField(null = True, blank = True)
    description = models.TextField(null = True, blank = True)
    updated = models.DateTimeField(auto_now = True) #on each saves takes a timestamp of the save of this model
    create_date = models.DateTimeField(auto_now_add = True) #only takes a timestamp on the creation of this model
    completed = models.BooleanField(default = False)
    deadline = models.DateTimeField(null = True, blank = True)
    project = models.ForeignKey(TaskProject, on_delete = models.CASCADE, default="Inbox")

    def __str__(self):
        return self.description[0:50]

    @staticmethod
    def getPk():
        return "id"
