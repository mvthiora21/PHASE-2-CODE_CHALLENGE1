import React from "react";

function Search({ query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a transaction using description...."
          className="search"
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Search;
