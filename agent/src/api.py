from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List, Dict, Any, Union
import uvicorn
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable is required")

# Import our news processing agents
from news_processor import NewsProcessor

# Initialize FastAPI app
app = FastAPI(
    title="News Processing API",
    description="API for processing news text: categorization, quiz generation, and summarization",
    version="1.0.0",
    docs_url=None,  # disable default docs endpoint
    redoc_url=None,  # disable default redoc endpoint
    openapi_url="/static/openapi.json"  # serve openapi.json from /static
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize our news processor agent
news_processor = NewsProcessor(api_key=api_key)

# Define request and response models
class NewsTextRequest(BaseModel):
    text: str

class CategoryResponse(BaseModel):
    main_category: str
    subcategory: str
    explanation: str

class QuizChoice(BaseModel):
    A: str
    B: str
    C: str
    D: str

class QuizResponse(BaseModel):
    question: str
    choices: QuizChoice
    correct_answer: str
    explanation: str

class SummaryResponse(BaseModel):
    summary: str
    key_points: List[str]
    entities: List[str]

class ErrorResponse(BaseModel):
    error: str
    raw_output: Optional[str] = None

# Root endpoint - redirect to OpenAPI documentation
@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/static/openapi.html")

# Define API endpoints
@app.post("/categorize", response_model=Union[CategoryResponse, ErrorResponse])
async def categorize_news(request: NewsTextRequest):
    """Categorize news text into predefined categories and subcategories"""
    try:
        result = news_processor.categorize(request.text)
        if "error" in result:
            return ErrorResponse(**result)
        return CategoryResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/quiz", response_model=Union[QuizResponse, ErrorResponse])
async def generate_quiz(request: NewsTextRequest):
    """Generate a multiple-choice quiz question based on news text"""
    try:
        result = news_processor.generate_quiz(request.text)
        if "error" in result:
            return ErrorResponse(**result)
        return QuizResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize", response_model=Union[SummaryResponse, ErrorResponse])
async def summarize_news(request: NewsTextRequest):
    """Generate a summary of news text with key points and entities"""
    try:
        result = news_processor.summarize(request.text)
        if "error" in result:
            return ErrorResponse(**result)
        return SummaryResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/process", response_model=Dict[str, Any])
async def process_all(request: NewsTextRequest):
    """Process news text with all available methods: categorize, quiz, and summarize"""
    try:
        categorization = news_processor.categorize(request.text)
        quiz = news_processor.generate_quiz(request.text)
        summary = news_processor.summarize(request.text)
        
        return {
            "categorization": categorization,
            "quiz": quiz,
            "summary": summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}

# Run the server if this file is executed directly
if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
