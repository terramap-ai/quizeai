import React from "react";
import { useNavigate } from "react-router-dom";

// Reuse simulated shadcn components from Quiz.tsx
const Card = ({ className, children, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>{children}</div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardFooter = ({ className, children }) => (
  <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);

const Button = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
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
      className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TypographyH3 = ({ className, children, ...props }) => (
  <h3
    className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CategorySelection = () => {
  const navigate = useNavigate();

  // Check if user has preferences
  const hasPreferences = localStorage.getItem("quizPreferences") !== null;

  // Sample categories
  const categories = [
    {
      id: "mix",
      name: "Mix Quiz",
      description: "A mix of questions from all categories",
      icon: "🎲",
      color: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
    },
    {
      id: "general",
      name: "General Knowledge",
      description: "Test your knowledge on a variety of topics",
      icon: "🧠",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "science",
      name: "Science",
      description: "Questions about physics, chemistry, and biology",
      icon: "🔬",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "history",
      name: "History",
      description: "Learn about important historical events and figures",
      icon: "📜",
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: "geography",
      name: "Geography",
      description: "Test your knowledge of countries, capitals, and landmarks",
      icon: "🌎",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Questions about movies, music, and pop culture",
      icon: "🎬",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "sports",
      name: "Sports",
      description: "Test your knowledge of various sports and athletes",
      icon: "⚽",
      color: "bg-red-100 text-red-800",
    },
  ];

  const handleCategorySelect = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  // Navigate to preferences page
  const goToPreferences = () => {
    navigate("/preferences");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {/* Header with decorative elements */}
      <div className="w-full max-w-4xl mb-4 text-center relative pb-8 pt-6">
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/4 w-4 h-4 rounded-full bg-indigo-200 opacity-50"></div>
        <div className="absolute top-8 right-1/4 w-6 h-6 rounded-full bg-blue-200 opacity-50"></div>
        <div className="absolute bottom-0 left-1/3 w-8 h-8 rounded-full bg-green-200 opacity-40"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="mr-2">Quiz</span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Master
            </span>
            <span className="ml-2 text-2xl">💫</span>
          </h1>

          <p className="text-gray-600 max-w-md mx-auto">
            Expand your knowledge with AI-powered quizzes based on the latest news and trends.
            Our system analyzes current events to create fresh, relevant questions daily.
          </p>

          {/* Preferences button */}
          <button
            onClick={goToPreferences}
            className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-white py-2 px-4 rounded-full shadow-sm transition-all hover:shadow-md"
          >
            {hasPreferences
              ? "Update your preferences"
              : "Set your quiz preferences"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* User stats summary if preferences exist */}
      {hasPreferences && (
        <div className="w-full max-w-4xl mb-8 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-indigo-100">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Your preferences are set!
                </p>
                <p className="text-xs text-gray-500">
                  Personalized quizzes based on your interests
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/quiz/mix")}
              className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16l4-4m0 0l-4-4m4 4H8m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try AI-Curated Daily Quiz
            </button>
          </div>
        </div>
      )}

      {/* Category Section Header */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex items-center mb-3">
          <div className="h-10 w-1 bg-indigo-600 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">Browse Categories</h2>
        </div>
        <p className="text-gray-600 pl-4">
          Explore AI-powered quizzes by category. Each quiz contains questions generated from the latest news and developments in that field.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="animate-slide-in"
            style={{
              animationDelay: `${categories.indexOf(category) * 0.1}s`,
            }}
          >
            {category.id === "mix" ? (
              <Card 
                className="h-full overflow-hidden border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-indigo-50"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-0 h-full">
                  <div className="p-6 relative h-full flex flex-col">
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 opacity-20">
                      <svg
                        className="w-24 h-24 text-indigo-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"></path>
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 mr-2">
                          <svg
                            className="w-4 h-4 text-indigo-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          Daily Mix
                        </h3>
                        {hasPreferences && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Personalized
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {hasPreferences
                          ? "AI-generated questions based on current news from your preferred topics"
                          : "AI-curated questions from trending news across all categories"}
                      </p>

                      <div className="flex items-center mb-3 bg-blue-50 p-2 rounded-md">
                        <svg className="w-4 h-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-blue-700">Updated with fresh questions daily</span>
                      </div>

                      <button
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md transition-colors font-medium flex items-center justify-center"
                      >
                        <span>AI-Curated Mix Quiz</span>
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="h-full cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`mb-4 w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl`}
                  >
                    {category.icon}
                  </div>
                  <TypographyH3 className="mb-2">{category.name}</TypographyH3>
                  <p className="text-gray-500 mb-4 flex-grow">{category.description}</p>
                  
                  {/* AI Badge */}
                  <div className="flex items-center mb-4 bg-gray-50 p-2 rounded-md">
                    <svg className="w-3.5 h-3.5 text-gray-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs text-gray-700">AI-curated current topics</span>
                  </div>
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 mt-auto"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <span>Start Quiz</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
