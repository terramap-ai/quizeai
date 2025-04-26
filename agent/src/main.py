import os
import json
from dotenv import load_dotenv
from news_processor import NewsProcessor

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")

# Example news text to process
example_news = """
SpaceX successfully launched its Starship rocket on a test flight today, 
marking a significant milestone in the company's efforts to develop a fully 
reusable spacecraft capable of carrying humans to Mars. The rocket reached 
an altitude of 250 kilometers before executing a controlled descent back to Earth.
"""

def main():
    # Initialize the comprehensive news processor agent
    news_processor = NewsProcessor(api_key=api_key)
    
    print("Processing news text:")
    print(example_news.strip())
    
    # Process the news text in different ways
    print("\n=== NEWS CATEGORIZATION ===")
    categorization = news_processor.categorize(example_news)
    print(json.dumps(categorization, indent=2))
    
    print("\n=== QUIZ GENERATION ===")
    quiz = news_processor.generate_quiz(example_news)
    print(json.dumps(quiz, indent=2))
    
    print("\n=== NEWS SUMMARY ===")
    summary = news_processor.summarize(example_news)
    print(json.dumps(summary, indent=2))

if __name__ == "__main__":
    main()