import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Simulated shadcn components
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${className}`}
  >
    {children}
  </div>
);

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader = ({ className, children }: CardHeaderProps) => (
  <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>{children}</div>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent = ({ className, children }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);

interface ButtonProps {
  variant?: "primary" | "outline" | "ghost" | "destructive" | "success" | "default";
  size?: "sm" | "lg" | "default";
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const Button = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) => {
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
      className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

const Progress = ({ value, max = 100, className }: ProgressProps) => (
  <div
    className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
  >
    <div
      className="h-full bg-indigo-600 transition-all duration-500"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

interface InputProps {
  className?: string;
  [key: string]: any;
}

const Input = ({ className, ...props }: InputProps) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

interface TypographyH3Props {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const TypographyH3 = ({ className, children, ...props }: TypographyH3Props) => (
  <h3
    className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const Badge = ({ variant = "default", className, children, ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-indigo-600 text-indigo-600";
      case "secondary":
        return "bg-gray-100 text-gray-900";
      case "destructive":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-indigo-100 text-indigo-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getVariantClass()} ${className}`}
      {...props}
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
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes confetti {
    0% { transform: translateY(-10px) rotate(0); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-bounce {
    animation: bounce 0.5s ease-in-out infinite;
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

const ElegantQuizApp = ({ category = "general" }) => {
  const navigate = useNavigate();
  
  // State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  type Answer = {
    answer: string;
    correct?: boolean;
    skipped?: boolean;
  };

  type Answers = {
    [questionId: string]: Answer;
  };

  const [answers, setAnswers] = useState<Answers>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mascotMood, setMascotMood] = useState("neutral");
  const [mascotMessage, setMascotMessage] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef(null);

  // Define the Question type
  type Question = {
    id: string;
    type: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
    acceptableAnswers?: string[];
  };

  // Define the QuestionSets type with index signature
  type QuestionSets = {
    [key: string]: Question[];
  };

  // Category-based questions
  const getCategoryQuestions = (categoryId: string): Question[] => {
    const questionSets: QuestionSets = {
      general: [
        {
          id: "general-q1",
          type: "multiple-choice",
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          correctAnswer: "Paris",
          explanation:
            "Paris is the capital and most populous city of France, situated on the river Seine.",
          points: 10,
        },
        {
          id: "general-q2",
          type: "true-false",
          question: "The Pacific Ocean is the largest ocean on Earth.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions, covering more than 30% of the Earth's surface.",
          points: 5,
        },
        {
          id: "general-q3",
          type: "fill-blank",
          question:
            "Complete the sentence: The Eiffel Tower is located in _____.",
          correctAnswer: "Paris",
          acceptableAnswers: ["paris", "Paris", "PARIS"],
          explanation:
            "The Eiffel Tower is a wrought-iron lattice tower located in Paris, France. It was named after the engineer Gustave Eiffel.",
          points: 15,
        },
      ],
      science: [
        {
          id: "science-q1",
          type: "multiple-choice",
          question: "Which of the following is NOT a state of matter?",
          options: ["Solid", "Liquid", "Gas", "Mineral"],
          correctAnswer: "Mineral",
          explanation:
            "The four fundamental states of matter are solid, liquid, gas, and plasma. Mineral is a type of solid material, not a state of matter.",
          points: 10,
        },
        {
          id: "science-q2",
          type: "true-false",
          question: "The human body has 206 bones.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "An adult human skeleton consists of 206 bones. At birth, there are approximately 270 bones, but many fuse together during development.",
          points: 5,
        },
        {
          id: "science-q3",
          type: "fill-blank",
          question: "The chemical symbol for gold is _____.",
          correctAnswer: "Au",
          acceptableAnswers: ["au", "Au", "AU"],
          explanation:
            "The chemical symbol Au comes from the Latin word for gold, 'aurum'.",
          points: 15,
        },
      ],
      history: [
        {
          id: "history-q1",
          type: "multiple-choice",
          question: "In which year did World War II end?",
          options: ["1943", "1945", "1947", "1950"],
          correctAnswer: "1945",
          explanation:
            "World War II ended in 1945 with the surrender of Japan after the atomic bombings of Hiroshima and Nagasaki.",
          points: 10,
        },
        {
          id: "history-q2",
          type: "true-false",
          question:
            "The Great Wall of China is visible from space with the naked eye.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Contrary to popular belief, the Great Wall of China cannot be seen from space with the naked eye. This is a common misconception.",
          points: 5,
        },
        {
          id: "history-q3",
          type: "fill-blank",
          question: "The ancient Egyptian writing system is called _____.",
          correctAnswer: "Hieroglyphics",
          acceptableAnswers: [
            "hieroglyphics",
            "Hieroglyphics",
            "hieroglyphs",
            "Hieroglyphs",
          ],
          explanation:
            "Hieroglyphics was the formal writing system used in Ancient Egypt, consisting of pictorial characters.",
          points: 15,
        },
      ],
      geography: [
        {
          id: "geography-q1",
          type: "multiple-choice",
          question: "Which country has the largest population in the world?",
          options: ["India", "United States", "China", "Russia"],
          correctAnswer: "India",
          explanation:
            "As of 2024, India surpassed China to become the most populous country in the world.",
          points: 10,
        },
        {
          id: "geography-q2",
          type: "true-false",
          question: "The Nile is the longest river in the world.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The Nile River is considered the longest river in the world, stretching about a length of 6,650 kilometers (4,130 miles).",
          points: 5,
        },
        {
          id: "geography-q3",
          type: "fill-blank",
          question: "The largest desert in the world is the _____ Desert.",
          correctAnswer: "Sahara",
          acceptableAnswers: ["sahara", "Sahara", "SAHARA"],
          explanation:
            "The Sahara Desert is the largest hot desert in the world, covering an area of about 9.2 million square kilometers.",
          points: 15,
        },
      ],
      entertainment: [
        {
          id: "entertainment-q1",
          type: "multiple-choice",
          question:
            "Who played the character of Iron Man in the Marvel Cinematic Universe?",
          options: [
            "Chris Evans",
            "Robert Downey Jr.",
            "Chris Hemsworth",
            "Mark Ruffalo",
          ],
          correctAnswer: "Robert Downey Jr.",
          explanation:
            "Robert Downey Jr. portrayed Tony Stark/Iron Man in the Marvel Cinematic Universe from 2008 to 2019.",
          points: 10,
        },
        {
          id: "entertainment-q2",
          type: "true-false",
          question: "The Beatles were originally from Liverpool, England.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The Beatles were formed in Liverpool, England in 1960 and became one of the most influential bands in history.",
          points: 5,
        },
        {
          id: "entertainment-q3",
          type: "fill-blank",
          question: "The movie franchise 'Star Wars' was created by _____.",
          correctAnswer: "George Lucas",
          acceptableAnswers: ["george lucas", "George Lucas", "Lucas"],
          explanation:
            "George Lucas created the Star Wars franchise, with the first film released in 1977.",
          points: 15,
        },
      ],
      sports: [
        {
          id: "sports-q1",
          type: "multiple-choice",
          question: "In which sport would you perform a slam dunk?",
          options: ["Football", "Basketball", "Tennis", "Golf"],
          correctAnswer: "Basketball",
          explanation:
            "A slam dunk is a move in basketball where a player jumps and forcefully puts the ball through the hoop with their hands.",
          points: 10,
        },
        {
          id: "sports-q2",
          type: "true-false",
          question: "The Olympic Games are held every 4 years.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The modern Olympic Games are held every four years, with Summer and Winter Olympics alternating every two years.",
          points: 5,
        },
        {
          id: "sports-q3",
          type: "fill-blank",
          question: "The FIFA World Cup is held every _____ years.",
          correctAnswer: "4",
          acceptableAnswers: ["4", "four", "Four", "FOUR"],
          explanation:
            "The FIFA World Cup is held every four years and is the most prestigious soccer tournament in the world.",
          points: 15,
        },
      ],
    };

    return questionSets[categoryId] || questionSets.general;
  };

  const questions = getCategoryQuestions(category);

  // Get random encouragement message
  const getRandomEncouragement = () => {
    const messages = [
      "Great job!",
      "Awesome work!",
      "You got it!",
      "Fantastic!",
      "Perfect answer!",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Handle option selection for multiple choice and true/false
  const handleOptionSelect = (option: string) => {
    if (isAnimating || showFeedback) return;

    const currentQuestion = questions[currentCardIndex];
    const isCorrect = option === currentQuestion.correctAnswer;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answer: option,
        correct: isCorrect,
      },
    }));

    setIsCorrectAnswer(isCorrect);

    // Update mascot mood and message
    if (isCorrect) {
      setMascotMood("happy");
      setMascotMessage(getRandomEncouragement());
      setScore((prev) => prev + currentQuestion.points);
      setStreak((prev) => prev + 1);

      // Auto proceed to next question after delay
      setTimeout(() => {
        moveToNextCard();
      }, 1500);
    } else {
      setMascotMood("sad");
      setMascotMessage(
        currentQuestion.explanation || "Not quite. Let's learn from this!"
      );
      setStreak(0);
      // Incorrect answers require user to acknowledge with "Got it" button
    }

    // Show feedback
    setShowFeedback(true);
  };

  // Handle text input for fill-blank questions
  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAnimating || showFeedback) return;

    const form = e.target as HTMLFormElement;
    const answerInput = form.elements.namedItem('answer') as HTMLInputElement;
    const answer = answerInput.value.trim();
    const currentQuestion = questions[currentCardIndex];

    // Check if answer is empty
    if (!answer) {
      alert("Please enter an answer or use the skip button");
      return;
    }

    // For fill-blank questions
    const acceptableAnswers = currentQuestion.acceptableAnswers || [
      currentQuestion.correctAnswer,
    ];
    const isCorrect = acceptableAnswers.some(
      (correct: string) => answer.toLowerCase() === correct.toLowerCase()
    );

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answer: answer,
        correct: isCorrect,
      },
    }));

    setIsCorrectAnswer(isCorrect);

    // Update mascot mood and message
    if (isCorrect) {
      setMascotMood("happy");
      setMascotMessage(getRandomEncouragement());
      setScore((prev) => prev + currentQuestion.points);
      setStreak((prev) => prev + 1);

      // Auto proceed to next question after delay
      setTimeout(() => {
        moveToNextCard();
      }, 1500);
    } else {
      setMascotMood("sad");
      setMascotMessage(
        currentQuestion.explanation ||
          `The correct answer was "${currentQuestion.correctAnswer}".`
      );
      setStreak(0);
      // Incorrect answers require user to acknowledge with "Got it" button
    }

    setShowFeedback(true);
  };

  // Handle user acknowledgment of incorrect answer
  const handleGotIt = () => {
    moveToNextCard();
  };

  // Skip current question
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
    setMascotMessage("No problem. We'll come back to this one later!");
    setStreak(0);

    moveToNextCard();
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    // Instead of resetting everything, redirect to categories page
    navigate('/categories');
  };
  
  // Go to home
  const handleGoHome = () => {
    navigate('/categories');
  };

  // Handle moving to the next card with animation
  const moveToNextCard = () => {
    setIsAnimating(true);
    setShowFeedback(false);
    setIsCorrectAnswer(null);

    // Update progress
    setProgress(((currentCardIndex + 1) / questions.length) * 100);

    setTimeout(() => {
      if (currentCardIndex < questions.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        // Reset input fields for the next question if it's a text input type
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        // Reset mascot state when moving to the next question
        setMascotMood("neutral");
        setMascotMessage("");
      } else {
        // Quiz completed
        setQuizCompleted(true);
        setShowConfetti(true);
        setMascotMood("happy");
        setMascotMessage("Congratulations on completing the quiz!");

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
    // Create different SVG expressions based on mood
    let mascotSvg;
    let mascotAnimationClass = "";

    if (mascotMood === "happy") {
      mascotSvg = (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle cx="50" cy="50" r="45" fill="#FFD166" />
          <circle cx="35" cy="38" r="5" fill="#333" />
          <circle cx="65" cy="38" r="5" fill="#333" />
          <path
            d="M30 65 Q50 80 70 65"
            stroke="#333"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="32" cy="36" r="2" fill="#FFF" />
          <circle cx="62" cy="36" r="2" fill="#FFF" />
          <path d="M25 25 L35 20" stroke="#333" strokeWidth="2" />
          <path d="M75 25 L65 20" stroke="#333" strokeWidth="2" />
        </svg>
      );
      mascotAnimationClass = "animate-bounce";
    } else if (mascotMood === "sad") {
      mascotSvg = (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle cx="50" cy="50" r="45" fill="#FFD166" />
          <circle cx="35" cy="40" r="5" fill="#333" />
          <circle cx="65" cy="40" r="5" fill="#333" />
          <path
            d="M30 70 Q50 60 70 70"
            stroke="#333"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M30 30 Q35 25 40 28"
            stroke="#333"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M60 28 Q65 25 70 30"
            stroke="#333"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    } else {
      // neutral
      mascotSvg = (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle cx="50" cy="50" r="45" fill="#FFD166" />
          <circle cx="35" cy="40" r="5" fill="#333" />
          <circle cx="65" cy="40" r="5" fill="#333" />
          <path
            d="M40 65 Q50 70 60 65"
            stroke="#333"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="35" cy="40" r="1" fill="#FFF" />
          <circle cx="65" cy="40" r="1" fill="#FFF" />
        </svg>
      );
    }

    return (
      <div className="relative">
        {/* Mascot character */}
        <div className={`transition-all duration-300 ${mascotAnimationClass}`}>
          {mascotSvg}
        </div>

        {/* Speech bubble */}
        {mascotMessage && (
          <div className="absolute top-0 left-28 bg-white rounded-xl p-4 shadow-md min-w-[200px] max-w-[280px] animate-slide-in z-10 transform -translate-y-1/4">
            <div className="absolute -left-2 top-1/3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
            <p className="text-sm font-medium text-gray-800">{mascotMessage}</p>
          </div>
        )}
      </div>
    );
  };

  // Render confetti for celebration
  const renderConfetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = `${Math.random() * 100}%`;
          const animationDuration = `${Math.random() * 3 + 2}s`;
          const delay = `${Math.random() * 0.5}s`;

          return (
            <div
              key={i}
              className="absolute top-0 rounded-md animate-confetti"
              style={{
                left,
                width: size,
                height: size * 1.5,
                backgroundColor: [
                  "#FF5733",
                  "#33FF57",
                  "#3357FF",
                  "#FF33A8",
                  "#FFD166",
                ][i % 5],
                animationDuration,
                animationDelay: delay,
              }}
            />
          );
        })}
      </div>
    );
  };

  // Render quiz results
  const renderResults = () => {
    const totalQuestions = questions.length;
    const skippedQuestions = Object.values(answers).filter(
      (a) => a.skipped
    ).length;
    const correctAnswers = Object.values(answers).filter(
      (a) => a.correct
    ).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <Card className="w-full max-w-md animate-slide-in">
        <CardHeader>
          <TypographyH3 className="text-center">Quiz Results</TypographyH3>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * percentage) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-xl font-bold">{score} pts</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Correct</div>
              <div className="text-xl font-bold">
                {correctAnswers}/{totalQuestions}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Highest Streak</div>
              <div className="text-xl font-bold">{streak}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Skipped</div>
              <div className="text-xl font-bold">{skippedQuestions}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleRestartQuiz}
          >
            Try Again
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoHome}>
            Back to Categories
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // Render the current question based on its type
  const renderQuestion = () => {
    const question = questions[currentCardIndex];

    switch (question.type) {
      case "multiple-choice":
      case "true-false":
        return (
          <div className="flex flex-col space-y-4 w-full">
            <TypographyH3>{question.question}</TypographyH3>
            <div className="space-y-2 w-full">
              {question.options?.map((option: string, index: number) => {
                // Determine button styling based on feedback state
                let buttonVariant: "primary" | "outline" | "ghost" | "destructive" | "success" | "default" = "outline";
                let isDisabled = false;

                if (showFeedback) {
                  isDisabled = true;

                  if (option === question.correctAnswer) {
                    // Always highlight the correct answer when showing feedback
                    buttonVariant = "success";
                  } else if (answers[question.id]?.answer === option) {
                    // This is the user's incorrect selection
                    buttonVariant = "destructive";
                  }
                } else if (answers[question.id]?.answer === option) {
                  // User's selection before feedback
                  buttonVariant = "primary";
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={`w-full justify-start text-left h-auto py-4 ${
                      showFeedback && option === question.correctAnswer
                        ? "ring-2 ring-green-500"
                        : ""
                    } ${
                      showFeedback &&
                      answers[question.id]?.answer === option &&
                      !isCorrectAnswer
                        ? "animate-shake"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isDisabled}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {/* Show explanation for incorrect answers */}
            {showFeedback && !isCorrectAnswer && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border-l-4 border-red-400 animate-fade-in shadow-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Explanation:
                    </p>
                    <p className="text-sm text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* "Got it" button shown only for incorrect answers */}
            {showFeedback && !isCorrectAnswer ? (
              <Button variant="primary" className="mt-4 w-full flex items-center justify-center" onClick={handleGotIt}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Got it
              </Button>
            ) : !showFeedback ? (
              <Button variant="ghost" className="mt-4" onClick={handleSkip}>
                Skip this question
              </Button>
            ) : null}
          </div>
        );

      case "fill-blank":
        return (
          <div className="w-full">
            <TypographyH3 className="mb-4">{question.question}</TypographyH3>
            <form onSubmit={handleTextSubmit} className="w-full">
              <Input
                ref={inputRef}
                type="text"
                name="answer"
                placeholder="Type your answer..."
                className="mb-4"
                disabled={showFeedback}
              />

              {/* Show correct answer and explanation for incorrect submissions */}
              {showFeedback && !isCorrectAnswer && (
                <div className="mt-4 mb-4 p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border-l-4 border-red-400 animate-fade-in shadow-sm">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Correct answer: <span className="text-green-600">{question.correctAnswer}</span>
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Button state depends on feedback status */}
              {showFeedback && !isCorrectAnswer ? (
                <Button
                  variant="primary"
                  type="button"
                  className="w-full mt-4 flex items-center justify-center"
                  onClick={handleGotIt}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Got it
                </Button>
              ) : !showFeedback ? (
                <div className="flex space-x-2">
                  <Button variant="primary" type="submit" className="flex-1 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    className="flex-1"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        );

      default:
        return <div>Question type not supported</div>;
    }
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

      {/* Mascot */}
      <div className="mb-6">{renderMascot()}</div>

      {/* Main content - either quiz card or results */}
      {!quizCompleted ? (
        <Card
          className={`w-full max-w-md ${
            isAnimating ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <CardContent className="pt-6 relative overflow-hidden">{renderQuestion()}</CardContent>
        </Card>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default ElegantQuizApp;
