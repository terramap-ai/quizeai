import json
import os
from agents import Agent, Runner, RunResult

class NewsCategorizer(Agent):
    def __init__(self, api_key=None):
        # Load categories from the JSON file
        with open(os.path.join(os.path.dirname(__file__), 'categories.json'), 'r') as f:
            self.categories_data = json.load(f)
        
        # Create a formatted string of categories for the prompt
        categories_str = self._format_categories()
        
        # Define the agent instructions
        instructions = f"""You are a news categorization expert. Your task is to analyze news text and categorize it according to the following categories and subcategories:

{categories_str}

For each news text, you should:
1. Identify the most appropriate main category from the list above
2. Identify the most appropriate subcategory within that main category
3. Provide a brief explanation (1-2 sentences) for why this categorization is appropriate

Return your analysis in the following JSON format:
{{
  "main_category": "Category Name",
  "subcategory": "Subcategory Name",
  "explanation": "Brief explanation for the categorization"
}}

Only return the JSON object, with no additional text before or after.
"""
        
        # Initialize the parent Agent class
        super().__init__(name="News Categorizer", instructions=instructions, api_key=api_key)
    
    def _format_categories(self):
        """Format the categories data into a readable string for the prompt"""
        formatted = ""
        for category in self.categories_data["categories"]:
            formatted += f"- {category['name']}:\n"
            for subcategory in category["subcategories"]:
                formatted += f"  * {subcategory}\n"
        return formatted
    
    def categorize(self, news_text):
        """Categorize the given news text"""
        result = Runner.run_sync(self, news_text)
        try:
            # Parse the JSON response
            import json
            categorization = json.loads(result.final_output)
            return categorization
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return the raw output
            return {
                "error": "Failed to parse categorization result",
                "raw_output": result.final_output
            }
