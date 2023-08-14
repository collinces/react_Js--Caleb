import { useState, useEffect } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import DefinitionSearch from "../components/DefinitionSearch";

import NotFound from "../components/NotFound";
import useFetch from "../hooks/UseFetch";

function Definition() {
  //const [word, setWord] = useState();

  //const [notfound, setNotfound] = useState(false);

  //const [serverError, setServerError] = useState(false);

  //const [error, setError] = useState(false);

  let { search } = useParams();

  const navigate = useNavigate();
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
  const [word, errorStatus] = useFetch(url);

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />

        <Link to="/dictionary">search another word</Link>
      </>
    );
  }

  if (errorStatus) {
    return (
      <>
        <p>there is an error from server. try again later</p>

        <Link to="/dictionary">search another word</Link>
      </>
    );
  }

  return (
    <div>
      {word?.[0]?.meanings ? (
        <>
          <h1>definition of word typed here: </h1>

          {word[0].meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech} : {meaning.definitions[0].definition}
              </p>
            );
          })}

          <p>Search again: </p>

          <DefinitionSearch />
        </>
      ) : (
        <p>loadind...</p>
      )}
    </div>
  );
}

export default Definition;
