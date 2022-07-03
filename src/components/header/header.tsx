import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Search from "./../Search/Search.js";
const Header = () => (
  <header className="px-2 border-b w-full max-w-7xl mx-auto py-4 flex items-center justify-between">
    <Link to="/">
      <div className="flex items-center space-x-2 hover:text-blue-600">
        <p className="font-bold text-2xl">Site
          Header</p>
      </div>
    </Link>
    <StaticQuery
      query={graphql`
    query SearchIndexQuery {
      siteSearchIndex {
      index
    }
 }
 `}
      render={data => (
        <Search
          searchIndex={data.siteSearchIndex.index} />
      )} />
  </header>
);
export default Header;