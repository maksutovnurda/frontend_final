from rest_framework import serializers
from .models import Category, Group, Product, ProductImage, Order, OrderItem
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image']


class GroupSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Group
        fields = ['id', 'name', 'category']


class ProductSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'sale', 'group', 'active']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user_name', 'address', 'phone', 'created_at', 'active', 'items']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
