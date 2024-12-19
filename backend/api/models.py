from django.db import models


class Category(models.Model):
    name = models.CharField('Название', max_length=255)
    image = models.ImageField('Изображение', upload_to='category_images/', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Group(models.Model):
    name = models.CharField('Название', max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"


class Product(models.Model):
    name = models.CharField('Название', max_length=255)
    description = models.TextField('Описание')
    price = models.IntegerField('Цена')
    sale = models.IntegerField('Скидка', default=0)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    active = models.BooleanField('Активный', default=True)

    def __str__(self):
        return f"{self.name} - {self.price}"

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField('Изображение', upload_to='products/')

    def __str__(self):
        return f"Image for {self.product.name}"


class Order(models.Model):
    user_name = models.CharField('Имя', max_length=255)
    address = models.TextField('Адрес')
    phone = models.CharField('Телефон', max_length=255)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    active = models.BooleanField('Активный', default=False)

    def __str__(self):
        return f"{self.user_name} - {self.phone}"

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name="Заказ")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Продукт")
    quantity = models.PositiveIntegerField('Количество', default=1)
    price = models.PositiveIntegerField('Цена за единицу во время заказа')

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    class Meta:
        verbose_name = "Элемент заказа"
        verbose_name_plural = "Элементы заказа"


class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField('Рейтинг') # 1/5
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    date = models.DateTimeField('Дата', auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.rating}"

    class Meta:
        verbose_name = "Рейтинг"
        verbose_name_plural = "Рейтинги"