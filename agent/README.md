# News Processing Agents

This project contains a set of AI agents for processing news text in various ways, with a FastAPI server for API access.

## Features

The project includes the following agents:

1. **News Categorizer** - Categorizes news text into predefined categories and subcategories
2. **Quiz Generator** - Creates multiple-choice questions based on news text
3. **News Processor** - A comprehensive agent that can categorize, generate quizzes, and summarize news text

## API Server

The project includes a FastAPI server that provides REST API endpoints for all news processing features:

- `/categorize` - Categorize news text
- `/quiz` - Generate a quiz question from news text
- `/summarize` - Create a summary of news text
- `/process` - Process news text with all methods at once
- `/health` - Health check endpoint

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

### Running the API Server

```bash
cd src
python api.py
```

The server will start on http://localhost:8000. You can access the interactive API documentation at http://localhost:8000/docs.

### Testing the API with the Client

```bash
cd src
python api_client.py
```

### Using the Python Modules Directly

Run the main script to see all features in action:

```bash
cd src
python main.py
```

#### News Categorizer

```python
from news_categorizer import NewsCategorizer

categorizer = NewsCategorizer(api_key="your_api_key")
result = categorizer.categorize("Your news text here")
print(result)
```

#### Quiz Generator

```python
from quiz_generator import QuizGenerator

quiz_gen = QuizGenerator(api_key="your_api_key")
result = quiz_gen.generate_question("Your news text here")
print(result)
```

#### Comprehensive News Processor

```python
from news_processor import NewsProcessor

processor = NewsProcessor(api_key="your_api_key")

# Categorize news
categorization = processor.categorize("Your news text here")

# Generate quiz
quiz = processor.generate_quiz("Your news text here")

# Summarize news
summary = processor.summarize("Your news text here")
```

## API Endpoints

### POST /categorize

Categorizes news text into predefined categories and subcategories.

**Request Body:**
```json
{
  "text": "Your news text here"
}
```

**Response:**
```json
{
  "main_category": "Technology",
  "subcategory": "Space Exploration",
  "explanation": "The news is about SpaceX's rocket launch..."
}
```

### POST /quiz

Generates a multiple-choice question based on news text.

**Request Body:**
```json
{
  "text": "Your news text here"
}
```

**Response:**
```json
{
  "question": "What milestone achievement did SpaceX reach recently?",
  "choices": {
    "A": "The company launched its first manned spacecraft",
    "B": "Its Starship rocket successfully completed a test flight",
    "C": "SpaceX introduced a new type of fuel for its rockets",
    "D": "The company inaugurated its new headquarters on Mars"
  },
  "correct_answer": "B",
  "explanation": "The news text mentions that SpaceX successfully launched its Starship rocket..."
}
```

### POST /summarize

Summarizes news text with key points and entities.

**Request Body:**
```json
{
  "text": "Your news text here"
}
```

**Response:**
```json
{
  "summary": "SpaceX successfully tested its Starship rocket...",
  "key_points": [
    "SpaceX completed a successful test flight of the Starship rocket",
    "The rocket reached an altitude of 250 kilometers",
    "The test advances SpaceX's efforts to develop a reusable spacecraft for Mars missions"
  ],
  "entities": [
    "SpaceX",
    "Starship rocket",
    "Mars"
  ]
}
```

## Categories

The categorization is based on the categories defined in `src/categories.json`, which includes:

- News & Politics
- Business & Economy
- Technology
- Science
- Health & Wellness
- Environment & Climate
- Sports
- Entertainment
- Arts & Culture
- Education
- Law & Justice
- Social Issues

Each category has multiple subcategories for more precise classification.

## Project Structure

- `src/`
  - `agents.py` - Base Agent and Runner classes
  - `news_categorizer.py` - News categorization agent
  - `quiz_generator.py` - Quiz generation agent
  - `news_processor.py` - Comprehensive news processing agent
  - `api.py` - FastAPI server with REST endpoints
  - `api_client.py` - Example client for the API
  - `categories.json` - Category definitions
  - `main.py` - Example usage of the Python modules

## License

MIT
