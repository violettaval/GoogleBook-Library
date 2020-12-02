import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        <h2>React Google Books Library</h2>
      </a>
      <a className="navbar-brand" href="/search">
        <h3>Search</h3>
      </a>
      <a className="navbar-brand" href="/saved">
        <h3>Saved</h3>
      </a>
    </nav>
  );
}

export default Nav;
