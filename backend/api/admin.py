from django.contrib import admin

from .models import Category, Product, Order, ProductImage, OrderItem, Rating

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Rating)

@admin.register(Category)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_product_count')

    def total_product_count(self, obj):
        return Product.objects.filter(category=obj).count()

    total_product_count.short_description = 'Количество групп'

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    save_as = True
    inlines = [ProductImageInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
