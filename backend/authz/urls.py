from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserProfileView, LoginPageView, SignupPageView, HomePageView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # API endpoints
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Template views
    path('login-page/', LoginPageView.as_view(), name='login_page'),
    path('signup-page/', SignupPageView.as_view(), name='signup_page'),
    path('home-page/', HomePageView.as_view(), name='home_page'),
]
