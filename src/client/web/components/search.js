import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';

function Search({ searchResults = ['foo', 'bar', 'baz'], searchValue, inheritedStyle }) {
  return (
    <div style={inheritedStyle.base}>
      <div>
        <input
          type="text"
          value={searchValue}
          style={inheritedStyle.input}
        >
        </input>
        <button
          style={inheritedStyle.button}
        >
          Search
        </button>
        <ul>
          {searchResults.map((result) =>
            <SearchResult searchResult={result} key={result} />
          )}
        </ul>
      </div>
      <div></div>
    </div>
  );
}

Search.propTypes = {
  inheritedStyle: RPT.object,
  inputChange: RPT.func,
  searchAction: RPT.func,
  searchResults: RPT.array,
  searchValue: RPT.string,
};

function SearchResult({ searchResult }) {
  return (
    <li>
      {searchResult}
    </li>
  );
}

SearchResult.propTypes = {
  searchResult: RPT.string
};

export default Radium(Search);
