from django.http import JsonResponse
from django.shortcuts import render
from django.db import models
from rest_framework import viewsets, mixins, filters, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import NewsQa, NewsCategory, UserDetail
from .serializers import NewsQaSerializer, NewsCategorySerializer, UserDetailSerializer
import requests
from eventregistry import EventRegistry, QueryArticlesIter

# Create your views here.

class ExtendedViewSet(viewsets.ModelViewSet):
    """Base ViewSet with common functionality"""
    pass

class NewsQaViewSet(ExtendedViewSet):
    """
    API endpoint for managing NewsQa items.
    
    retrieve:
    Return a specific NewsQa item.

    list:
    Return a list of all NewsQa items filtered by the user's preferred categories.
    
    create:
    Create a new NewsQa item.
    
    update:
    Update an existing NewsQa item.
    
    partial_update:
    Update part of an existing NewsQa item.
    
    delete:
    Delete a NewsQa item.
    """
    queryset = NewsQa.objects.all()
    serializer_class = NewsQaSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['question', 'answer', 'description', 'paragraph']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()

        # Only filter by user categories if user is authenticated
        if self.request.user.is_authenticated:
            try:
                user_detail = UserDetail.objects.get(user=self.request.user)
                user_categories = user_detail.categories

                if user_categories:
                    queryset = queryset.filter(category_id__in=user_categories)
            except UserDetail.DoesNotExist:
                # If user has no details, return all questions
                pass
        
        return queryset

    @action(detail=False, methods=['get'])
    def all(self, request):
        """
        Get all NewsQa items
        
        Returns a list of all NewsQa items in the database.
        
        Returns:
            A list of NewsQa items
        """
        return self.list(request)

    @action(detail=False, methods=['post'])
    def all_by_category(self, request):
        """
        Get all NewsQa items
        
        Returns a list of all NewsQa items in the database.
        
        Returns:
            A list of NewsQa items
        """
        data = self.request.data
        category = data['category']
        category_id = NewsCategory.objects.filter(name=category).first().id
        return JsonResponse(data = self.get_serializer(self.get_queryset().filter(category_id=category_id), many=True).data, safe=False)
    
    @action(detail=False, methods=['get'])
    def random(self, request):
        """
        Get a random NewsQa item
        
        Returns a randomly selected NewsQa item from the database.
        Useful for quiz applications or random question generators.
        """
        random_item = NewsQa.objects.order_by('?').first()
        if random_item:
            serializer = self.get_serializer(random_item)
            return Response(serializer.data)
        return Response({"detail": "No items found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """
        Get NewsQa items grouped by category
        
        Returns NewsQa items organized by category. If the user has preferred categories
        in their UserDetail, only those categories will be included. Otherwise, all
        categories will be returned.
        
        Returns:
            A dictionary with category names as keys and lists of NewsQa items as values.
        """
        # Default to all categories
        categories = NewsCategory.objects.all()
        
        # If user is authenticated, try to get their preferred categories
        if request.user.is_authenticated:
            try:
                user_detail = UserDetail.objects.get(user=request.user)
                user_categories = user_detail.categories
                # If user has preferred categories, use them
                if user_categories:
                    categories = NewsCategory.objects.filter(id__in=user_categories)
            except UserDetail.DoesNotExist:
                # Fallback to all categories if user detail doesn't exist
                pass
        
        result = {}
        
        for category in categories:
            items = NewsQa.objects.filter(category=category)[:5]  # Limit to 5 items per category
            if items.exists():
                result[category.name] = self.get_serializer(items, many=True).data
        
        return Response(result)

    @action(detail=False, methods=['get'])
    def update_news(self, request):
        """
        Update news questions from external sources
        
        Fetches news articles from EventRegistry API for each root category,
        generates quiz questions using an external AI service, and stores them
        in the database as NewsQa items.
        
        Returns:
            A success message when the update is complete.
        """
        categories = NewsCategory.objects.filter(parent_category=None)
        er = EventRegistry(apiKey = 'e76ab0cf-e470-4a1f-b166-19e95f10e96c')
        for category in categories:
            query = {
            "$query": {
                "categoryUri": category.uri
            },
            "$filter": {
            "forceMaxDataTimeWindow": "31"
            }
        }
            q = QueryArticlesIter.initWithComplexQuery(query)
            for article in q.execQuery(er, maxItems=10):
                if NewsQa.objects.filter(uri=article["uri"]).exists():
                    continue
                response_data = requests.post('https://3249-103-163-65-38.ngrok-free.app/quiz', json={"text": article["body"]}).json()
                NewsQa.objects.create(
                    category=category,
                    question=response_data["question"],
                    answer=response_data["correct_answer"],
                    description=response_data["explanation"],
                    options=response_data["choices"],
                    paragraph=article["body"],
                    uri=article["uri"]
                )
        return Response({"message": "News updated successfully"})



class NewsCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing NewsCategory items.
    
    retrieve:
    Return a specific category.

    list:
    Return a list of all categories.
    """
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    
    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        """
        Get all questions for a specific category
        
        Returns all NewsQa items that belong to the specified category.
        
        Parameters:
            pk (int): The primary key of the category
            
        Returns:
            A list of NewsQa items belonging to the category
        """
        category = self.get_object()
        questions = NewsQa.objects.filter(category=category)
        serializer = NewsQaSerializer(questions, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def user_categories(self, request):
        """
        Get categories based on user preferences
        
        Returns only the categories that the authenticated user has selected as preferences
        in their UserDetail. If the user has no preferences or no UserDetail, an error
        message is returned.
        
        Returns:
            A list of NewsCategory items that match the user's preferences
        """
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required to get user categories"}, status=status.HTTP_200_OK)
            
        try:
            user_detail = UserDetail.objects.get(user=request.user)
            user_categories = user_detail.categories
            if user_categories:
                categories = self.get_queryset().filter(id__in=user_categories)
                serializer = self.get_serializer(categories, many=True)
                return Response(serializer.data)
            else:
                return Response({"detail": "User has no preferred categories"}, status=status.HTTP_200_OK)
        except UserDetail.DoesNotExist:
            return Response({"detail": "User detail not found"}, status=status.HTTP_200_OK)


class UserDetailViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user details and preferences.
    
    retrieve:
    Return the authenticated user's detail.

    list:
    Return the authenticated user's detail.
    
    create:
    Create a new user detail for the authenticated user.
    
    update:
    Update the authenticated user's detail.
    
    partial_update:
    Update part of the authenticated user's detail.
    
    delete:
    Delete the authenticated user's detail.
    """
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        # Only return the current user's detail if authenticated
        if self.request.user.is_authenticated:
            return UserDetail.objects.filter(user=self.request.user)
        return UserDetail.objects.none()
    
    def list(self, request):
        """
        Get the current user's detail
        
        Returns the UserDetail object for the authenticated user.
        If no UserDetail exists or user is not authenticated, an informative message is returned.
        
        Returns:
            The UserDetail object for the authenticated user
        """
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required to view user details"}, status=status.HTTP_200_OK)
            
        try:
            user_detail = UserDetail.objects.get(user=request.user)
            serializer = self.get_serializer(user_detail)
            return Response(serializer.data)
        except UserDetail.DoesNotExist:
            return Response({"detail": "User detail not found"}, status=status.HTTP_200_OK)
    
    def create(self, request):
        """Create user detail if it doesn't exist"""
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required to create user details"}, status=status.HTTP_200_OK)
            
        try:
            # Check if user detail already exists
            UserDetail.objects.get(user=request.user)
            return Response({"detail": "User detail already exists. Use PUT to update."}, 
                            status=status.HTTP_200_OK)
        except UserDetail.DoesNotExist:
            # Create new user detail
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def update_categories(self, request):
        """
        Update user's preferred categories
        
        Updates the list of preferred categories for the authenticated user.
        If the user has no UserDetail, a new one will be created.
        
        Parameters:
            categories (list): A list of category IDs to set as preferences
            
        Returns:
            The updated UserDetail object
            
        Raises:
            400 Bad Request: If any of the provided category IDs don't exist
        """
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required to update categories"}, status=status.HTTP_200_OK)
            
        categories = request.data.get('categories', [])
        
        # Validate that all category IDs exist
        if categories:
            existing_categories = set(NewsCategory.objects.filter(id__in=categories).values_list('id', flat=True))
            invalid_categories = set(categories) - existing_categories
            if invalid_categories:
                return Response({"detail": f"Categories with IDs {invalid_categories} do not exist"}, 
                                status=status.HTTP_200_OK)
        
        try:
            user_detail = UserDetail.objects.get(user=request.user)
            user_detail.categories = categories
            user_detail.save()
            serializer = self.get_serializer(user_detail)
            return Response(serializer.data)
        except UserDetail.DoesNotExist:
            # Create new user detail with categories
            user_detail = UserDetail.objects.create(
                user=request.user,
                categories=categories
            )
            serializer = self.get_serializer(user_detail)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
