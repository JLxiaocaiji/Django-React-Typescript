from django.shortcuts import render

# 导入 csrf 免除装饰器,使得其他域可以访问 api
# 跨站请求伪造（CSRF）与跨站请求脚本正好相反。跨站请求脚本的问题在于，
# 客户端信任服务器端发送的数据。跨站请求伪造的问题在于，服务器信任来自客户端的数据
from django.views.decorators.csrf import csrf_exempt

# jsonparser将传入的数据解析为 数据模型  解析json序列化数据
from  rest_framework.parsers import JSONParser

from EmployeeApp.models import Departments,Employees
from EmployeeApp.serializer import DepartmentSerializer,EmployeeSerializer
from django.http.response import JsonResponse, HttpResponse
# 使其保存在文件夹中
from django.core.files.storage import default_storage

# Create your views here.

# 该方法接收一个可选 id,
# def departmentApi(request,DepartmentId):
def departmentApi(request):
    # GET 获取该 id 下的 json 格式的部门数据表
    if request.method =='GET':
        departments = Departments.objects.all()
        # 转换为 json 格式
        departments_serializer = DepartmentSerializer(departments,many=True)  # many ???
        # JsonResponse 一个 HTTP 响应类，它使用要序列化为 JSON 的数据; safe:控制是否只有 ``dict`` 对象可以被序列化,默认为 true
        return JsonResponse(departments_serializer.data, safe = False)

    # POST 修改数据
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        # 使用序列化器 将其转换为 模型类型
        departments_serializer = DepartmentSerializer(data = department_data) # 没有 many?
        # 若模型有效,将其保存到数据库
        if departments_serializer.is_valid():
            departments_serializer.save()
            return (JsonResponse('添加成功',safe = False))
        print(departments_serializer)
        return JsonResponse('添加失败',safe = False )

    # PUT 更新现有方法
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        # 'DepartmentId' 不能有空格
        department = Departments.objects.get(DepartmentId = department_data['DepartmentId'])
        # 使用序列化器类将其映射为新值
        departemnt_serializer = DepartmentSerializer(department,data = department_data)
        if departemnt_serializer.is_valid():
            departemnt_serializer.save()
            return JsonResponse('数据更新成功',safe = False)
        return JsonResponse('数据更新失败',safe = False)
    # elif request.method == 'DELETE':
    #     print(DepartmentId)
    #     department = Departments.objects.get(DepartmentId=DepartmentId)
    #     department.delete()
    #     return JsonResponse('删除成功', safe=False)

def departmentApi1(request, DepartmentId):
    print(DepartmentId)
    if request.method == 'DELETE':
        print(DepartmentId)
        department = Departments.objects.get(DepartmentId=DepartmentId)
        department.delete()
        return JsonResponse('删除成功', safe=False)


    # GET 获取该 id 下的 json 格式的部门数据表
# def employeeApi(request,id=0):
def employeeApi(request):
    if request.method =='GET':
        employees = Employees.objects.all()
        # 转换为 json 格式
        employees_serializer = EmployeeSerializer(employees,many=True)  # many ???
        # JsonResponse 一个 HTTP 响应类，它使用要序列化为 JSON 的数据; safe:控制是否只有 ``dict`` 对象可以被序列化,默认为 true
        return JsonResponse(employees_serializer.data, safe = False)

    # POST 修改数据
    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        # 使用序列化器 将其转换为 模型类型
        employees_serializer = EmployeeSerializer(data = employee_data) # 没有 many?
        # 若模型有效,将其保存到数据库
        if employees_serializer.is_valid():
            employees_serializer.save()
            return (JsonResponse('添加成功',safe = False))
        return JsonResponse('添加失败',safe = False )

    # PUT 更新现有方法
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        # 'EmployeeId' 不能有空格
        employee = Employees.objects.get(EmployeeId = employee_data['EmployeeId'])
        # 使用序列化器类将其映射为新值
        employee_serializer = EmployeeSerializer(employee,data = employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse('数据更新成功',safe = False)
        return JsonResponse('数据更新失败',safe = False)
    elif request.method == 'DELETE':
        department = Employees.objects.get(EmployeeId=EmployeeId)
        department.delete()
        return JsonResponse('删除成功', safe=False)


        # department = Employees.objects.get(EmployeeId=3)
        # department.delete()
        # return JsonResponse('删除成功', safe=False)

def employeeApi1(request,EmployeeId):
    if request.method == 'DELETE':
        print(EmployeeId)
        # django.core.exceptions.FieldError: Cannot resolve keyword 'EmployeeId' into field. Choices are: DepartmentId, DepartmentName
        employee = Employees.objects.get(EmployeeId=EmployeeId)
        employee.delete()
        return JsonResponse('删除成功', safe=False)

def SaveFile(request):
    # 与 postman 中的 key 值相对应
    file = request.FILES['myFile']
    file_name = default_storage.save(file.name ,file)
    return JsonResponse(file_name,safe= False)