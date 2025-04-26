import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Lightbulb,
  BookOpen,
  Code,
  Calculator,
  Globe,
  Beaker,
  X,
  ArrowRight,
  Check,
  Music,
  Film,
  Medal,
  TreePine,
} from "lucide-react";

// Simulated shadcn components (reused from Quiz.tsx)
const Card = ({ className, children, onClick }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white shadow-sm transition-all ${className}`}
    onClick={onClick}
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

const categoryData = [
  {
    id: "general",
    name: "General Knowledge",
    icon: <Lightbulb size={24} />,
    color: "bg-blue-100 text-blue-600",
    subcategories: [
      { id: "general-history", name: "Historical Facts" },
      { id: "general-geography", name: "World Geography" },
      { id: "general-current", name: "Current Affairs" },
      { id: "general-trivia", name: "Random Trivia" },
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: <Beaker size={24} />,
    color: "bg-green-100 text-green-600",
    subcategories: [
      { id: "science-physics", name: "Physics" },
      { id: "science-chemistry", name: "Chemistry" },
      { id: "science-biology", name: "Biology" },
      { id: "science-astronomy", name: "Astronomy" },
    ],
  },
  {
    id: "history",
    name: "History",
    icon: <BookOpen size={24} />,
    color: "bg-amber-100 text-amber-600",
    subcategories: [
      { id: "history-ancient", name: "Ancient History" },
      { id: "history-medieval", name: "Medieval History" },
      { id: "history-modern", name: "Modern History" },
      { id: "history-world-wars", name: "World Wars" },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    icon: <Globe size={24} />,
    color: "bg-indigo-100 text-indigo-600",
    subcategories: [
      { id: "geography-countries", name: "Countries and Capitals" },
      { id: "geography-landmarks", name: "Famous Landmarks" },
      { id: "geography-natural", name: "Natural Features" },
      { id: "geography-climate", name: "Climate and Environment" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: <Film size={24} />,
    color: "bg-purple-100 text-purple-600",
    subcategories: [
      { id: "entertainment-movies", name: "Movies" },
      { id: "entertainment-tv", name: "TV Shows" },
      { id: "entertainment-music", name: "Music" },
      { id: "entertainment-celebrities", name: "Celebrities" },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Medal size={24} />,
    color: "bg-red-100 text-red-600",
    subcategories: [
      { id: "sports-football", name: "Football/Soccer" },
      { id: "sports-basketball", name: "Basketball" },
      { id: "sports-cricket", name: "Cricket" },
      { id: "sports-olympics", name: "Olympic Games" },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Code size={24} />,
    color: "bg-gray-100 text-gray-600",
    subcategories: [
      { id: "technology-computers", name: "Computers" },
      { id: "technology-internet", name: "Internet" },
      { id: "technology-gadgets", name: "Gadgets" },
      { id: "technology-programming", name: "Programming" },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: <Calculator size={24} />,
    color: "bg-emerald-100 text-emerald-600",
    subcategories: [
      { id: "mathematics-algebra", name: "Algebra" },
      { id: "mathematics-geometry", name: "Geometry" },
      { id: "mathematics-calculus", name: "Calculus" },
      { id: "mathematics-puzzles", name: "Math Puzzles" },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    icon: <TreePine size={24} />,
    color: "bg-lime-100 text-lime-600",
    subcategories: [
      { id: "nature-animals", name: "Animals" },
      { id: "nature-plants", name: "Plants and Flowers" },
      { id: "nature-ecosystems", name: "Ecosystems" },
      { id: "nature-conservation", name: "Conservation" },
    ],
  },
];

const CategoryPreferenceSelection = () => {
  // State for onboarding
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // State for multiple category selection
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  // Check if a category is selected
  const isCategorySelected = (categoryId) => {
    return selectedPreferences.some((pref) => pref.startsWith(categoryId));
  };

  // Select or deselect a category (all subcategories)
  const toggleCategorySelection = (category) => {
    const categoryId = category.id;

    // If category is already fully selected, remove all
    if (isFullCategorySelected(category)) {
      setSelectedPreferences(
        selectedPreferences.filter((pref) => !pref.startsWith(categoryId))
      );
    }
    // Otherwise, add all subcategories
    else {
      // First remove any existing subcategories
      const filtered = selectedPreferences.filter(
        (pref) => !pref.startsWith(categoryId)
      );

      // Add all subcategories
      const subcategoryIds = category.subcategories.map(
        (sub) => `${categoryId}:${sub.id}`
      );

      setSelectedPreferences([...filtered, ...subcategoryIds]);
    }
  };

  // Check if all subcategories of a category are selected
  const isFullCategorySelected = (category) => {
    if (!category.subcategories) return false;

    return category.subcategories.every((sub) =>
      selectedPreferences.includes(`${category.id}:${sub.id}`)
    );
  };

  // Check if some but not all subcategories are selected
  const isPartialCategorySelected = (category) => {
    if (!category.subcategories) return false;

    const hasSelected = category.subcategories.some((sub) =>
      selectedPreferences.includes(`${category.id}:${sub.id}`)
    );

    return hasSelected && !isFullCategorySelected(category);
  };

  // Toggle a subcategory selection
  const toggleSubcategory = (categoryId, subcategoryId) => {
    const preferenceId = `${categoryId}:${subcategoryId}`;

    if (selectedPreferences.includes(preferenceId)) {
      setSelectedPreferences(
        selectedPreferences.filter((id) => id !== preferenceId)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preferenceId]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedPreferences.length === 0) {
      alert("Please select at least one category or subcategory.");
      return;
    }

    setLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log selections for demonstration
    console.log("Selected preferences:", selectedPreferences);

    // Save to localStorage as an example
    localStorage.setItem(
      "quizPreferences",
      JSON.stringify(selectedPreferences)
    );

    setLoading(false);

    // Navigate to categories page
    navigate("/categories");
  };

  // Handle skip
  const handleSkip = () => {
    navigate("/categories");
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  // Render onboarding steps
  const renderOnboarding = () => {
    const steps = [
      {
        id: "welcome",
        title: "Welcome to AI-Powered QuizMaster",
        description:
          "Set up your preferences to receive personalized AI-generated quizzes based on the latest news and developments in your favorite topics.",
        component: renderWelcomeStep,
      },
      {
        title: "Choose Your Interests",
        description:
          "Select categories and specific topics you want to practice. You'll get daily quizzes based on your preferences.",
        action: "Continue",
      },
    ];

    const currentStepData = steps[currentStep];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md animate-slide-in shadow-lg border border-gray-200 overflow-hidden">
          {/* Decorative top accent */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 w-full"></div>

          <CardHeader className="relative pb-8 pt-8">
            {/* Decorative elements */}
            <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-indigo-200 opacity-30"></div>
            <div className="absolute bottom-3 right-6 w-6 h-6 rounded-full bg-purple-200 opacity-30"></div>

            <h2 className="text-2xl font-bold text-center text-gray-900">
              {currentStepData.title}
            </h2>
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              <span className="text-xs font-medium text-gray-500">
                Step {currentStep + 1}/{steps.length}
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6 text-center text-gray-600">
              {currentStepData.description}
            </div>

            {/* Progress bar */}
            <div className="flex items-center justify-center w-full mb-8 relative">
              <div className="h-1 w-full bg-gray-200 absolute"></div>
              <div
                className="h-1 bg-indigo-600 absolute left-0 transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
              {steps.map((_, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full flex items-center justify-center z-10 transition-all ${
                      index > 0 ? "ml-auto" : ""
                    } ${
                      isCompleted
                        ? "bg-indigo-600 text-white"
                        : isCurrent
                        ? "bg-white border-2 border-indigo-600"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  handleNextStep();
                } else {
                  setShowOnboarding(false);
                }
              }}
            >
              {currentStepData.action} <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  // Render welcome step
  const renderWelcomeStep = () => {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <Lightbulb className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <p className="mb-4 text-gray-700 font-medium">
          Powered by advanced AI technology
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-medium text-blue-800">
              AI-Generated Content
            </span>
          </div>
          <p className="text-sm text-gray-600 text-left">
            Our system analyzes the latest news, trends, and developments across
            various topics to create fresh, relevant quiz questions daily.
            Select your interests to receive personalized AI-curated content.
          </p>
        </div>

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          onClick={handleNextStep}
        >
          <span>Let's Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  // Render category selection UI
  const renderCategorySelection = () => {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pb-24">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Preferences
          </h1>
          <p className="text-gray-600 mb-6">
            Choose categories and topics you're interested in. You can select
            multiple options.
          </p>

          <div className="space-y-3 mb-8">
            {categoryData.map((category) => (
              <div key={category.id} className="animate-slide-in">
                <div
                  className={`rounded-lg border ${
                    isCategorySelected(category.id)
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-200 bg-white"
                  } shadow-sm`}
                >
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-md mr-3 ${category.color}`}
                        role="presentation"
                      >
                        {category.icon}
                      </div>
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className={`mr-3 p-1.5 rounded-md ${
                          isCategorySelected(category.id)
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategorySelection(category);
                        }}
                      >
                        {isFullCategorySelected(category) ? (
                          <Check size={18} />
                        ) : isPartialCategorySelected(category) ? (
                          <div className="w-[18px] h-[18px] flex items-center justify-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-sm"></div>
                          </div>
                        ) : (
                          <div className="w-[18px] h-[18px] border-2 border-gray-400 rounded-sm"></div>
                        )}
                      </button>
                      {expandedCategory === category.id ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </div>
                  </div>

                  {expandedCategory === category.id && (
                    <div className="p-4 pt-0 border-t border-gray-100">
                      <div className="pl-10 space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center py-1"
                          >
                            <button
                              className={`mr-3 p-1.5 rounded-md ${
                                selectedPreferences.includes(
                                  `${category.id}:${subcategory.id}`
                                )
                                  ? "bg-indigo-100 text-indigo-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                              onClick={() =>
                                toggleSubcategory(category.id, subcategory.id)
                              }
                            >
                              {selectedPreferences.includes(
                                `${category.id}:${subcategory.id}`
                              ) ? (
                                <Check size={16} />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                              )}
                            </button>
                            <span className="text-sm text-gray-700">
                              {subcategory.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between z-10">
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>Save Preferences</>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return showOnboarding ? renderOnboarding() : renderCategorySelection();
};

export default CategoryPreferenceSelection;
