from django.db import models
import django.utils.timezone as timezone

# Create your models here.

class Departments(models.Model):
    # 防止报错 没有 objects()
    objects = models.Manager()
    DepartmentId = models.AutoField(primary_key = True)
    DepartmentName = models.CharField(max_length=256)

class Employees(models.Model):
    objects = models.Manager()
    EmployeeId = models.AutoField(primary_key = True)
    EmployeeName = models.CharField(max_length = 100)
    Department = models.CharField(max_length = 100)
    # DateOfJoining = models.DateTimeField(max_length = 100,default = timezone.now)
    DateOfJoining = models.DateField()
    PhotoFileName = models.CharField(max_length =100)