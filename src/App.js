import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
// yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
