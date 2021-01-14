import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { searchQuery, setSearchQuery, error } = useGlobalContext();

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h1>Search movies</h1>
      <input
        type="text"
        className="form-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
