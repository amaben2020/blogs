import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Index } from "elasticlunr";
const Search = ({ searchIndex }) => {
  const [query, setQuery] = useState("");
  let [index, setIndex] = useState();
  let [results, setResults] = useState([]);
  useEffect(() => {
    setIndex(Index.load(searchIndex));
  }, [searchIndex]);

  const search = (evt) => {
    const query = evt.target.value;

    console.log(query);
    setQuery(query);
    setResults(
      index
        .search(query, { expand: query.length > 2 })
        .map(({ ref }) => index?.documentStore.getDoc(ref))
    );
  };
  console.log(index);
  const searchResultSize = 3;
  return (
    <div className="relative w-64 text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search"
        autoComplete="on"
        aria-label="Search"
        onChange={search}
        value={query}
      />
      {results.length > 0 && (
        <div>
          {results
            .slice(0, searchResultSize)
            .map(({ title, description, path }) => (
              <Link key={path} to={path}>
                <p>{title}</p>
                <p className="text-xs">{description}</p>
              </Link>
            ))}
          {results.length > searchResultSize && (
            <Link to={"/search?q=${query}"}>
              <p>
                + {results.length - searchResultSize}
                more
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
export default Search;
