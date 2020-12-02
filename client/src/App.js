import React from "react";
import SavedBooks from "./pages/SavedBooks";
import SearchBooks from "./pages/SearchBooks";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/saved">
            <SavedBooks />
          </Route>
          <Route exact path="/search">
            <SearchBooks />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
