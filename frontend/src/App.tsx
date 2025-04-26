import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import QuizApp from "./QuizNew";
import ElegantQuizApp from "./Quiz";
import CategorySelection from "./CategorySelection";
import CategoryPreferenceSelection from "./Screens/CategoryPreferenceSelection";

function App() {
  // Check if preferences exist and determine initial redirect
  const hasPreferences = localStorage.getItem("quizPreferences") !== null;
  const initialRedirect = hasPreferences ? "/quiz/mix" : "/categories";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={initialRedirect} replace />} />
        <Route path="/categories" element={<CategorySelection />} />
        <Route path="/quiz/:category" element={<QuizWrapper />} />
        <Route path="/preferences" element={<CategoryPreferenceSelection />} />
      </Routes>
    </Router>
  );
}

// This wrapper component handles the quiz route
function QuizWrapper() {
  // The parameters are now handled directly in the QuizApp component
  return <QuizApp />;
}

export default App;
