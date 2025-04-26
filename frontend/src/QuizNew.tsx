import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchQuizQuestions,
  fetchCategoryQuizQuestions,
  fetchMixQuizQuestions,
  QuizQuestion,
} from "./services/api";

// Component for cards
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

// Component for card headers
interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  className = "",
  children,
}) => (
  <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>{children}</div>
);

// Component for card content
interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children,
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// Component for card footers
interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({
  className = "",
  children,
}) => (
  <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);

// Button component
interface ButtonProps {
  variant?:
    | "primary"
    | "outline"
    | "ghost"
    | "destructive"
    | "success"
    | "default";
  size?: "sm" | "lg" | "default";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  onClick,
  disabled = false,
  type = "button",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-indigo-600 text-white hover:bg-indigo-700";
      case "outline":
        return "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50";
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-700";
      case "destructive":
        return "bg-red-600 text-white hover:bg-red-700";
      case "success":
        return "bg-emerald-600 text-white hover:bg-emerald-700";
      default:
        return "bg-gray-900 text-white hover:bg-gray-800";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm px-3 py-1.5 rounded-md";
      case "lg":
        return "text-lg px-6 py-3 rounded-lg";
      default:
        return "text-sm px-4 py-2 rounded-md";
    }
  };

  return (
    <button
      type={type}
      className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Progress bar component
interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = "",
}) => (
  <div
    className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
  >
    <div
      className="h-full bg-indigo-600 transition-all duration-500"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

// Badge component
interface BadgeProps {
  variant?: "default" | "outline" | "secondary" | "success";
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className = "",
  children,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-indigo-600 text-indigo-600";
      case "secondary":
        return "bg-gray-100 text-gray-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-indigo-100 text-indigo-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getVariantClass()} ${className}`}
    >
      {children}
    </span>
  );
};

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes confetti {
    0% { transform: translateY(0) rotate(0); opacity: 1; }
    100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
  }
  
  .animate-shake {
    animation: shake 0.4s ease-in-out;
  }
  
  .animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  .animate-confetti {
    animation: confetti 2s ease-out forwards;
  }
`;
document.head.appendChild(style);

const QuizApp = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Define the internal Question type
  interface Question {
    id: string;
    type: string;
    question: string;
    options: { [key: string]: string };
    correctAnswer: string;
    explanation: string;
    points: number;
    category?: number;
    paragraph?: string;
  }

  // Define the Answer type
  type Answer = {
    answer: string;
    correct?: boolean;
    skipped?: boolean;
  };

  type Answers = {
    [questionId: string]: Answer;
  };

  // State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mascotMood, setMascotMood] = useState<"neutral" | "happy" | "sad">(
    "neutral"
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Track which questions had their context viewed before answering
  const [viewedContextMap, setViewedContextMap] = useState<{[key: string]: boolean}>({}); 
  // Show/hide context for current question
  const [showContext, setShowContext] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Convert API question to internal format
  const convertApiQuestionToInternalFormat = (
    apiQuestion: QuizQuestion
  ): Question => {
    const letterToAnswerMap: { [key: string]: string } = {
      A: "0",
      B: "1",
      C: "2",
      D: "3",
    };

    return {
      id: apiQuestion.id.toString(),
      type: "multiple-choice",
      question: apiQuestion.question,
      options: apiQuestion.options,
      correctAnswer:
        letterToAnswerMap[apiQuestion.answer] || apiQuestion.answer,
      explanation: apiQuestion.description,
      points: 10,
      category: apiQuestion.category,
      paragraph: apiQuestion.paragraph,
    };
  };

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedQuestions: QuizQuestion[];

        if (category === "mix") {
          fetchedQuestions = await fetchMixQuizQuestions(10);
        } else if (category) {
          // Make sure category is a valid number
          const categoryId = parseInt(category);
          if (!isNaN(categoryId)) {
            fetchedQuestions = await fetchCategoryQuizQuestions(categoryId);
          } else {
            // If category isn't a valid number, fallback to general questions
            console.warn(
              `Invalid category ID: ${category}, falling back to general questions`
            );
            fetchedQuestions = await fetchQuizQuestions();
          }
        } else {
          fetchedQuestions = await fetchQuizQuestions();
        }

        const formattedQuestions = fetchedQuestions.map(
          convertApiQuestionToInternalFormat
        );
        setQuestions(formattedQuestions);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  // Handle showing context for the current question
  const handleToggleContext = () => {
    const currentQuestion = questions[currentCardIndex];
    // Mark this question as having its context viewed
    if (!showContext) {
      setViewedContextMap(prev => ({
        ...prev,
        [currentQuestion.id]: true
      }));
    }
    setShowContext(!showContext);
  };

  // Handle text input submission for fill-in-the-blank questions
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnimating || showFeedback) return;

    // Use inputRef to get the answer value
    const answer = inputRef.current?.value || "";
    if (!answer.trim()) return; // Prevent empty submissions

    const currentQuestion = questions[currentCardIndex];

    // Simple string comparison for now (could be enhanced with fuzzy matching)
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

    // Update answers object
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answer: answer,
        correct: isCorrect,
      },
    }));

    setIsCorrectAnswer(isCorrect);

    // Update mascot mood and score
    if (isCorrect) {
      setMascotMood("happy");
      
      // Check if context was viewed before answering
      const contextWasViewed = viewedContextMap[currentQuestion.id];
      
      // Award points only if context wasn't viewed
      if (!contextWasViewed) {
        setScore((prev) => prev + currentQuestion.points);
      }
      // No points if context was viewed
      
      setStreak((prev) => prev + 1);

      // Auto proceed to next question after delay
      setTimeout(() => {
        moveToNextCard();
      }, 1500);
    } else {
      setMascotMood("sad");
      setStreak(0);
    }

    setShowFeedback(true);
  };

  // Handle option selection for multiple choice
  const handleOptionSelect = (option: string) => {
    if (isAnimating || showFeedback) return;

    const currentQuestion = questions[currentCardIndex];

    // Check if the selected option is correct
    const isCorrect = option === currentQuestion.correctAnswer;

    // Update answers object
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answer: option,
        correct: isCorrect,
      },
    }));

    setIsCorrectAnswer(isCorrect);

    // Update mascot mood and score
    if (isCorrect) {
      setMascotMood("happy");
      
      // Check if context was viewed before answering
      const contextWasViewed = viewedContextMap[currentQuestion.id];
      
      // Award full points only if context wasn't viewed
      if (!contextWasViewed) {
        setScore((prev) => prev + currentQuestion.points);
      }
      
      setStreak((prev) => prev + 1);

      // Trigger confetti for streaks
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }

      // Auto proceed to next question after delay
      setTimeout(() => {
        moveToNextCard();
      }, 1500);
    } else {
      setMascotMood("sad");
      setStreak(0);
      // Incorrect answers require user to acknowledge with "Got it" button
    }

    setShowFeedback(true);
  };

  // Handle skip question
  const handleSkip = () => {
    if (isAnimating || showFeedback) return;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentCardIndex].id]: {
        answer: "skipped",
        skipped: true,
      },
    }));

    setMascotMood("neutral");
    setStreak(0);

    moveToNextCard();
  };

  // Handle "Got it" button click
  const handleGotIt = () => {
    moveToNextCard();
  };

  // Move to next card with animation
  const moveToNextCard = () => {
    setIsAnimating(true);
    setShowFeedback(false);
    setIsCorrectAnswer(null);
    setMascotMood("neutral");
    // Reset context visibility for the next question
    setShowContext(false);

    setTimeout(() => {
      // Check if there are more questions
      if (currentCardIndex < questions.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setProgress(
          ((currentCardIndex + 1) / (questions.length - 1)) * 100
        );
      } else {
        // Quiz completed
        setQuizCompleted(true);
        setMascotMood("happy");

        // Hide confetti after a few seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
      setIsAnimating(false);
    }, 500);
  };

  // Render the mascot with different expressions
  const renderMascot = () => {
    let mascotEmoji;
    let mascotAnimationClass = "";

    switch (mascotMood) {
      case "happy":
        mascotEmoji = "😄";
        mascotAnimationClass = "animate-pulse";
        break;
      case "sad":
        mascotEmoji = "😢";
        mascotAnimationClass = "animate-shake";
        break;
      default:
        mascotEmoji = "🤔";
    }

    return (
      <div className={`text-4xl ${mascotAnimationClass}`}>{mascotEmoji}</div>
    );
  };

  // Render confetti effect
  const renderConfetti = () => {
    const confettiColors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const delay = Math.random() * 1.5;
          const colorIndex = Math.floor(Math.random() * confettiColors.length);

          return (
            <div
              key={i}
              className={`animate-confetti absolute top-0 rounded-full ${confettiColors[colorIndex]}`}
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  };

  // Render results at the end of the quiz
  const renderResults = () => {
    const correctAnswers = Object.values(answers).filter(
      (a) => a.correct
    ).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    let resultMessage;
    let resultEmoji;

    if (percentage >= 90) {
      resultMessage = "Outstanding!";
      resultEmoji = "🏆";
    } else if (percentage >= 70) {
      resultMessage = "Great job!";
      resultEmoji = "🌟";
    } else if (percentage >= 50) {
      resultMessage = "Good effort!";
      resultEmoji = "👍";
    } else {
      resultMessage = "Keep practicing!";
      resultEmoji = "💪";
    }

    return (
      <Card className="w-full max-w-md animate-fadeIn">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl">{resultEmoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {resultMessage}
          </h2>
          <p className="text-center text-gray-600">You scored {score} points</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Correct answers:</span>
              <Badge variant="success">
                {correctAnswers} / {totalQuestions}
              </Badge>
            </div>
            <Progress value={percentage} />
            <p className="text-center text-gray-500 text-sm pt-2">
              {percentage}% correct
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate("/categories")}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Categories
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // The main render function for displaying the current question
  const renderQuestion = () => {
    // Show skeleton UI while loading
    if (loading) {
      return (
        <div className="w-full animation-pulse">
          {/* Question skeleton */}
          <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-6 animate-pulse"></div>
          
          {/* Context button skeleton */}
          <div className="h-8 bg-gray-200 rounded-md w-full mb-6 animate-pulse"></div>
          
          {/* Options skeleton */}
          <div className="space-y-3 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
            ))}
          </div>
          
          {/* Skip button skeleton */}
          <div className="h-10 bg-gray-200 rounded-md w-full mt-4 animate-pulse"></div>
          
          <p className="text-gray-500 text-center mt-4">Loading quiz questions...</p>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <svg
            className="w-12 h-12 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </div>
      );
    }

    // Show empty state
    if (questions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <p className="text-gray-600">
            No questions available for this category.
          </p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </div>
      );
    }

    // Return null if currentCardIndex is out of bounds
    if (currentCardIndex >= questions.length) {
      return null;
    }

    // Get the current question
    const currentQuestion = questions[currentCardIndex];

    // Render multiple choice question
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>
        {currentQuestion.paragraph && (
          <div className="mb-4">
            {!showContext ? (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-xs text-red-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Viewing context forfeits points</span>
                  </div>
                  <div className="text-xs text-gray-500">Optional</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center text-gray-600 border-gray-300 hover:bg-gray-50" 
                  onClick={handleToggleContext}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                  Reveal News Context
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-md mb-4 text-sm text-gray-700 max-h-[150px] overflow-y-auto">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs uppercase tracking-wide text-gray-500">Context</h4>
                  <button 
                    className="text-xs text-gray-500 hover:text-gray-700" 
                    onClick={handleToggleContext}
                  >
                    Hide ×
                  </button>
                </div>
                <p>{currentQuestion.paragraph}</p>
                <div className="mt-2 text-xs text-red-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  No points will be awarded for correct answers after viewing context
                </div>
              </div>
            )}
          </div>
        )}
        {/* Handle different question types */}
        {currentQuestion.type === 'fill-blank' ? (
          <div className="space-y-4">
            <form onSubmit={handleTextSubmit}>
              <div className="space-y-4">
                <input
                  ref={inputRef}
                  type="text"
                  name="answer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  placeholder="Type your answer..."
                  disabled={showFeedback}
                />
                
                {showFeedback && !isCorrectAnswer && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-800">
                    <p className="font-medium">Correct answer: {currentQuestion.correctAnswer}</p>
                    <p className="mt-1">{currentQuestion.explanation}</p>
                  </div>
                )}
                
                {showFeedback && isCorrectAnswer && (
                  <div className="p-3 bg-green-50 border border-green-100 rounded-md text-sm text-green-800">
                    <p className="font-medium">Correct!</p>
                    <p className="mt-1">{currentQuestion.explanation}</p>
                  </div>
                )}

                {showFeedback && !isCorrectAnswer ? (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleGotIt}
                  >
                    Got it
                  </Button>
                ) : !showFeedback ? (
                  <div className="flex flex-col space-y-2">
                    <Button variant="primary" className="w-full" type="submit">
                      Submit Answer
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      type="button"
                      onClick={handleSkip}
                    >
                      Skip this question
                    </Button>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(
              ([letter, option], index) => {
                // Determine button styling based on feedback state
                let buttonVariant:
                  | "primary"
                  | "outline"
                  | "ghost"
                  | "destructive"
                  | "success"
                  | "default" = "outline";
                let isDisabled = false;

                if (showFeedback) {
                  isDisabled = true;

                  if (index.toString() === currentQuestion.correctAnswer) {
                    // Always highlight the correct answer when showing feedback
                    buttonVariant = "success";
                  } else if (
                    answers[currentQuestion.id]?.answer === index.toString()
                  ) {
                    // This is the user's incorrect selection
                    buttonVariant = "destructive";
                  }
                } else if (
                  answers[currentQuestion.id]?.answer === index.toString()
                ) {
                  // User's selection before feedback
                  buttonVariant = "primary";
                }

                return (
                  <Button
                    key={letter}
                    variant={buttonVariant}
                    className={`w-full text-left p-3 rounded-md ${
                      showFeedback &&
                      index.toString() === currentQuestion.correctAnswer
                        ? "ring-2 ring-green-500"
                        : ""
                    } ${
                      showFeedback &&
                      answers[currentQuestion.id]?.answer === index.toString() &&
                      !isCorrectAnswer
                        ? "animate-shake"
                        : ""
                    }`}
                    disabled={isDisabled}
                    onClick={() => handleOptionSelect(index.toString())}
                  >
                    <div className="flex items-start">
                      <span className="bg-gray-100 text-gray-700 font-medium w-6 h-6 rounded-full flex items-center justify-center mr-3 shrink-0">
                        {letter.toUpperCase()}
                      </span>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </Button>
                );
              }
            )}
          </div>
        )}
        {/* Show explanation for incorrect answers */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-lg border-l-4 shadow-sm ${
              isCorrectAnswer
                ? "bg-gradient-to-r from-green-50 to-white border-green-400"
                : "bg-gradient-to-r from-red-50 to-white border-red-400"
            }`}
          >
            <div className="flex items-start">
              <svg
                className={`w-5 h-5 mr-2 mt-0.5 ${
                  isCorrectAnswer ? "text-green-500" : "text-red-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isCorrectAnswer
                      ? "M5 13l4 4L19 7"
                      : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {isCorrectAnswer ? "Correct!" : "Explanation:"}
                </p>
                <p className="text-sm text-gray-700">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {showFeedback && !isCorrectAnswer ? (
          <Button
            variant="primary"
            className="mt-4 w-full flex items-center justify-center"
            onClick={handleGotIt}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Got it
          </Button>
        ) : !showFeedback ? (
          <Button
            variant="ghost"
            className="mt-2 w-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={handleSkip}
          >
            Skip this question
          </Button>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Header with app name and score */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="font-bold text-xl text-gray-900">QuizMaster</span>
          {streak > 1 && (
            <Badge variant="success" className="ml-2">
              🔥 {streak} streak
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-indigo-600"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium text-gray-900">{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>
            Question {currentCardIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Show confetti on quiz completion */}
      {showConfetti && renderConfetti()}

      {/* Mascot - smaller and without speech bubble */}
      <div className="mb-4">{renderMascot()}</div>

      {/* Main content - either quiz card or results */}
      {!quizCompleted ? (
        <Card
          className={`w-full max-w-md ${
            isAnimating ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <CardContent className="pt-6 relative overflow-hidden">
            {renderQuestion()}
          </CardContent>
        </Card>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default QuizApp;
