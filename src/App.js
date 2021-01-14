import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import SingleMovie from "./SingleMovie";
import Movie from "./SingleMovie";

function App() {
  const [theme, setTheme] = useState("light-theme");
  const changeTheme = () => {
    if (theme == "light-theme") setTheme("dark-theme");
    else setTheme("light-theme");
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies/:id" children={<SingleMovie />}></Route>
      </Switch>

      <div className="theme-button">
        <button className="btn" onClick={changeTheme}>
          Change theme
        </button>
      </div>
    </main>
  );
}

export default App;
