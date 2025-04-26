import json
import os
from agents import Agent, Runner, RunResult

class QuizGenerator(Agent):
    def __init__(self, api_key=None):
        # Define the agent instructions
        instructions = """You are a quiz question generator specializing in creating multiple-choice questions based on news text.

For each news text provided, you should:
1. Create a relevant and challenging multiple-choice question based on the content
2. Generate 4 possible answers (A, B, C, D), with only one being correct
3. Indicate which answer is correct
4. Ensure the question tests comprehension of key information in the news text

Return your question in the following JSON format:
{
  "question": "The question text goes here?",
  "choices": {
    "A": "First option",
    "B": "Second option",
    "C": "Third option",
    "D": "Fourth option"
  },
  "correct_answer": "A",
  "explanation": "Brief explanation of why this is the correct answer"
}

Only return the JSON object, with no additional text before or after.
"""
        
        # Initialize the parent Agent class
        super().__init__(name="Quiz Generator", instructions=instructions, api_key=api_key)
    
    def generate_question(self, news_text):
        """Generate a multiple-choice question based on the given news text"""
        result = Runner.run_sync(self, news_text)
        try:
            # Parse the JSON response
            import json
            quiz_question = json.loads(result.final_output)
            return quiz_question
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return the raw output
            return {
                "error": "Failed to parse quiz question result",
                "raw_output": result.final_output
            }
