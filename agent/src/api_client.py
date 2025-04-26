import requests
import json

# API base URL
BASE_URL = "http://localhost:8000"

# Example news text
example_news = """
SpaceX successfully launched its Starship rocket on a test flight today, 
marking a significant milestone in the company's efforts to develop a fully 
reusable spacecraft capable of carrying humans to Mars. The rocket reached 
an altitude of 250 kilometers before executing a controlled descent back to Earth.
"""

def call_api(endpoint, news_text):
    """Call the API with the given endpoint and news text"""
    url = f"{BASE_URL}/{endpoint}"
    payload = {"text": news_text}
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

def main():
    print("News Processing API Client")
    print("=========================\n")
    
    print("News text:")
    print(example_news.strip())
    print("\n")
    
    # Health check
    try:
        health_response = requests.get(f"{BASE_URL}/health")
        if health_response.status_code == 200:
            print(f"API Status: {health_response.json()['status']}\n")
        else:
            print(f"API Health Check Failed: {health_response.status_code}\n")
            return
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API server. Make sure it's running.\n")
        return
    
    # Call each endpoint
    print("1. Categorization:")
    categorization = call_api("categorize", example_news)
    if categorization:
        print(json.dumps(categorization, indent=2))
    print("\n")
    
    print("2. Quiz Generation:")
    quiz = call_api("quiz", example_news)
    if quiz:
        print(json.dumps(quiz, indent=2))
    print("\n")
    
    print("3. Summarization:")
    summary = call_api("summarize", example_news)
    if summary:
        print(json.dumps(summary, indent=2))
    print("\n")
    
    print("4. Process All:")
    all_results = call_api("process", example_news)
    if all_results:
        print(json.dumps(all_results, indent=2))

if __name__ == "__main__":
    main()
