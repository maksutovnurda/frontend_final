from rest_framework import viewsets
from .models import Category, Group, Product, ProductImage, Order, OrderItem
from .serializers import CategorySerializer, GroupSerializer, ProductSerializer, ProductImageSerializer, \
    OrderSerializer, OrderItemSerializer, UserSerializer, SignUpSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from rest_framework.permissions import AllowAny


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class GroupViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Group.objects.all()
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductPagination(PageNumberPagination):
    page_size = 10  # Items per page
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Product.objects.all()
        group_id = self.request.query_params.get('group', None)
        if group_id:
            queryset = queryset.filter(group_id=group_id)
        return queryset

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]