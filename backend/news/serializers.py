from rest_framework import serializers
from .models import NewsQa, NewsCategory, UserDetail


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ['id', 'name', 'uri', 'parent_category']


class NewsQaSerializer(serializers.ModelSerializer):
    category_details = NewsCategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = NewsQa
        fields = ['id', 'category', 'category_details', 'question', 'answer', 
                 'description', 'options', 'paragraph', 'created_at', 'updated_at']


class UserDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = UserDetail
        fields = ['id', 'user', 'username', 'categories']
