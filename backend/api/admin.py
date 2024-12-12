from django.contrib import admin

from .models import Category, Group, Product, Order, ProductImage, OrderItem

admin.site.register(Order)
admin.site.register(OrderItem)

@admin.register(Group)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('name_cat', 'total_product_count')

    def name_cat(self, obj):
        return f"{obj.category.name} - {obj.name}"

    def total_product_count(self, obj):
        return Product.objects.filter(group=obj).count()

    name_cat.short_description = 'Группа'
    total_product_count.short_description = 'Количество продуктов'


@admin.register(Category)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_group_count')

    def total_group_count(self, obj):
        return Group.objects.filter(category=obj).count()

    total_group_count.short_description = 'Количество групп'

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    save_as = True
    inlines = [ProductImageInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
