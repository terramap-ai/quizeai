import json
import os
from agents import Agent, Runner, RunResult

class NewsProcessor(Agent):
    """
    A comprehensive news processing agent that can:
    1. Categorize news text
    2. Generate quiz questions
    3. Create summaries
    """
    
    def __init__(self, api_key=None):
        # Load categories from the JSON file
        with open(os.path.join(os.path.dirname(__file__), 'categories.json'), 'r') as f:
            self.categories_data = json.load(f)
        
        # Create a formatted string of categories for the prompt
        categories_str = self._format_categories()
        
        # Define the agent instructions
        instructions = f"""You are a comprehensive news processing assistant that can analyze news text in multiple ways.
Depending on the task requested, you will perform one of the following functions:

1. CATEGORIZE: Categorize the news according to these categories and subcategories:
{categories_str}

2. QUIZ: Create a multiple-choice question based on the news content

3. SUMMARIZE: Create a concise summary of the news

For each task, respond in the appropriate JSON format:

For CATEGORIZE:
{{
  "main_category": "Category Name",
  "subcategory": "Subcategory Name",
  "explanation": "Brief explanation for the categorization"
}}

For QUIZ:
{{
  "question": "The question text goes here?",
  "choices": {{
    "A": "First option",
    "B": "Second option",
    "C": "Third option",
    "D": "Fourth option"
  }},
  "correct_answer": "A",
  "explanation": "Brief explanation of why this is the correct answer"
}}

For SUMMARIZE:
{{
  "summary": "Concise summary of the news (1-3 sentences)",
  "key_points": ["Key point 1", "Key point 2", "Key point 3"],
  "entities": ["Important entity 1", "Important entity 2"]
}}

Only return the JSON object, with no additional text before or after.
"""
        
        # Initialize the parent Agent class
        super().__init__(name="News Processor", instructions=instructions, api_key=api_key)
    
    def _format_categories(self):
        """Format the categories data into a readable string for the prompt"""
        formatted = ""
        for category in self.categories_data["categories"]:
            formatted += f"- {category['name']}:\n"
            for subcategory in category["subcategories"]:
                formatted += f"  * {subcategory}\n"
        return formatted
    
    def process(self, news_text, task="CATEGORIZE"):
        """
        Process the given news text based on the specified task
        
        Args:
            news_text (str): The news text to process
            task (str): The processing task - "CATEGORIZE", "QUIZ", or "SUMMARIZE"
            
        Returns:
            dict: The processed result
        """
        # Validate task
        task = task.upper()
        if task not in ["CATEGORIZE", "QUIZ", "SUMMARIZE"]:
            return {"error": f"Invalid task: {task}. Must be one of: CATEGORIZE, QUIZ, SUMMARIZE"}
        
        # Create the prompt with the task and news text
        prompt = f"TASK: {task}\n\nNEWS TEXT:\n{news_text}"
        
        # Run the agent
        result = Runner.run_sync(self, prompt)
        
        try:
            # Parse the JSON response
            processed_result = json.loads(result.final_output)
            return processed_result
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return the raw output
            return {
                "error": f"Failed to parse {task.lower()} result",
                "raw_output": result.final_output
            }
    
    def categorize(self, news_text):
        """Categorize the given news text"""
        return self.process(news_text, task="CATEGORIZE")
    
    def generate_quiz(self, news_text):
        """Generate a quiz question based on the given news text"""
        return self.process(news_text, task="QUIZ")
    
    def summarize(self, news_text):
        """Summarize the given news text"""
        return self.process(news_text, task="SUMMARIZE")
