# serializer 帮助转化复杂的类型或者模型的实例，到本机python的数据类型，
# 再将其转化为json\xml或者其他内容类型，且有助于反序列化,将解析的数据转化为复杂类型
# Serializer 序列化 的使用不需要依赖于模型,所以可以不要编写model,直接编写serializer文件

from rest_framework import serializers
from EmployeeApp.models import Departments,Employees

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('DepartmentId','DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeeId','EmployeeName','Department','DateOfJoining','PhotoFileName')
