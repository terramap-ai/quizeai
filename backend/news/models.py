from unicodedata import category
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BaseModelManager(models.Manager):
    def get_queryset(self):
        return super(BaseModelManager, self).get_queryset().filter(is_deleted=False)


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    objects = BaseModelManager()
    all_objects = models.Manager()

    def hard_delete(self, *args, **kwargs):
        super(BaseModel, self).delete(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

    class Meta:
        abstract = True

class NewsCategory(BaseModel):
    name = models.CharField(max_length=100)
    uri = models.CharField(max_length=100)
    parent_category = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)


class NewsQa(BaseModel):
    category = models.ForeignKey(NewsCategory, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()
    description = models.TextField()
    options = models.JSONField(max_length=100)
    paragraph = models.TextField(null=True)
    uri = models.CharField(max_length=100, unique=True, null=True)

class UserDetail(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_detail')
    categories = models.JSONField()


