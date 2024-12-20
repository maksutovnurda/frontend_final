from django.db.models import Avg
from rest_framework import viewsets, permissions
from .models import Category, Product, ProductImage, Order, OrderItem, Rating
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer, \
    OrderSerializer, OrderItemSerializer, UserSerializer, SignUpSerializer, RatingSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from rest_framework.permissions import AllowAny


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductPagination(PageNumberPagination):
    page_size = 10  # Items per page
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.annotate(
            avg_rating=Avg('rating__rating')
        ).prefetch_related('images')
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class IsAdminOrSelf(permissions.BasePermission):
    """
    Custom permission to only allow users to access their own profile,
    unless they are admins.
    """
    def has_object_permission(self, request, view, obj):
        # Allow access if the user is an admin or the profile belongs to them
        return request.user.is_staff or obj == request.user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        # Admins see all users, regular users see only their own profile
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    def get_queryset(self):
        queryset = Rating.objects.all()
        product_id = self.request.query_params.get('product', None)
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset