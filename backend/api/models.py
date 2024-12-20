from django.db import models
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail, EmailMessage

class Category(models.Model):
    name = models.CharField('Название', max_length=255)
    image = models.ImageField('Изображение', upload_to='category_images/', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Product(models.Model):
    name = models.CharField('Название', max_length=255)
    description = models.TextField('Описание')
    price = models.IntegerField('Цена')
    sale = models.IntegerField('Скидка', default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
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
    rating = models.IntegerField('Рейтинг')  # 1/5
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    date = models.DateTimeField('Дата', auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.rating}"

    class Meta:
        verbose_name = "Рейтинг"
        verbose_name_plural = "Рейтинги"


class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # the below like concatinates your websites reset password url and the reset email token which will be required at a later stage
    email_plaintext_message = "Open the link to reset your password" + " " + "{}{}".format(
        instance.request.build_absolute_uri("http://localhost:3000/login/reset-password-form/"),
        reset_password_token.key)

    """
        this below line is the django default sending email function, 
        takes up some parameter (title(email title), message(email body), from(email sender), to(recipient(s))
    """
    # print(email_plaintext_message)
    # send_mail(
    #     # title:
    #     "Password Reset for {title}".format(title="Crediation portal account"),
    #     # message:
    #     email_plaintext_message,
    #     # from:
    #     "220103298@stu.sdu.edu.kz",
    #     # to:
    #     [reset_password_token.user.email],
    #     fail_silently=False,
    # )

    import requests
    BOT_TOKEN = "7440644452:AAHDnqkwlbKmSyJYBvCz7PRtZ0-VkPpKP-M"
    CHAT_ID = "-1002255378266"

    payload = {
        "chat_id": CHAT_ID,
        "text": email_plaintext_message,
    }

    response = requests.post(f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage", data=payload, verify=False)
