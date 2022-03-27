from EmployeeApp import views
# from django.conf.urls import url  # 文档 4.0 么有了
from django.urls import path,re_path

# 给网址添加静态 路径,便于通过 url 访问
from django.conf.urls.static import static
from django.conf import settings


app_name = 'EmployeeApp'
urlpatterns = [
    re_path(r'^department/$',views.departmentApi),  # 需要re_path才能使用 r'^ '
    re_path(r'^department/([0-9]+)/$',views.departmentApi1),

    # path('department/',views.departmentApi),  # 需要re_path才能使用 r'^ '

    # re_path(r'^department/(?P<DepartmentId>\d)/$',views.departmentApi),
    # re_path(r'department/[int:DepartmentId/]',views.departmentApi),
    # re_path(r'department/(\d+)$',views.departmentApi),
    # re_path(r'department/[int:DepartmentId/]$',views.departmentApi),




    re_path(r'^employee/$',views.employeeApi),  # 需要re_path才能使用 r'^ '
    re_path(r'^employee/([0-9]+)/$',views.employeeApi1),
    # path('employee/',views.employeeApi),  # 需要re_path才能使用 r'^ '
    # re_path(r'^department/[int:DepartmentId/]$',views.departmentApi1),

    # re_path(r'employee/(?P<EmployeeId>\d[0-9])/$',views.employeeApi),
    # path(r'employee/(?P<int:EmployeeId>\d)/$',views.employeeApi1),
    # re_path(r'^employee/(?P[EmployeeId])/$',views.employeeApi),

    # 为api 方法映射一个根路径
    re_path(r'Employee/SaveFile$',views.SaveFile)
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

