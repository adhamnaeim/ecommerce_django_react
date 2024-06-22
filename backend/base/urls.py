from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name="routes"),
    path('users/register/',views.registerUser,name="users-register"),
    path('users/profile/',views.getUserProfile,name="users-profile"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/',views.getUsers,name="users"),
    path('products/<str:pk>',views.getProduct,name="product"),
    path('products/',views.getProducts,name="products"),
]
