from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsQaViewSet, NewsCategoryViewSet, UserDetailViewSet

router = DefaultRouter()
router.register(r'newsqa', NewsQaViewSet)
router.register(r'categories', NewsCategoryViewSet)
router.register(r'user-details', UserDetailViewSet, basename='user-details')

urlpatterns = [
    path('', include(router.urls)),
]
