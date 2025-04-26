import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ElegantQuizApp from "./Quiz";
import CategorySelection from "./CategorySelection";
import CategoryPreferenceSelection from "./Screens/CategoryPreferenceSelection";

function App() {
  // Check if preferences exist and determine initial redirect
  const hasPreferences = localStorage.getItem('quizPreferences') !== null;
  const initialRedirect = hasPreferences ? '/quiz/mix' : '/categories';
  
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

// This wrapper component gets the category from URL params and passes it to the quiz
function QuizWrapper() {
  const { category } = useParams();
  return <ElegantQuizApp category={category} />;
}

// Import useParams at the top level to avoid hoisting issues
import { useParams } from "react-router-dom";

export default App;
