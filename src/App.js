import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
// yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/movies/:id">
                    <Detail />
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;