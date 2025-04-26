from eventregistry import *

from news.models import NewsCategory





def upload_categories(flattened_categories):
    id_to_obj = {}

    for item in flattened_categories:
        parent_obj = id_to_obj.get(item['parent_id'])
        
        category = NewsCategory.objects.create(
            name=item['name'],
            uri=item['uri'],
            parent_category=parent_obj
        )
        id_to_obj[item['id']] = category

