import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h1>
        <FontAwesomeIcon icon={faPlay} />
        &nbsp;My Music App
      </h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
