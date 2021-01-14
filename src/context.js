import React, { useState, useContext, useEffect } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("avengers");

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (data.Response == "True") {
        setMovies(data.Search);
        setError({ show: false, msg: "" });
      } else if (data.Error == "Incorrect IMDb ID.") {
        setError({ show: true, msg: "Please enter a movie title" });
        setMovies([]);
      } else {
        setError({ show: true, msg: data.Error });
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${searchQuery}`);
  }, [searchQuery]);

  return (
    <AppContext.Provider
      value={{ isLoading, error, movies, searchQuery, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
