import { useState, useEffect } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import DefinitionSearch from "../components/DefinitionSearch";

import NotFound from "../components/NotFound";

function Definition() {
  const [word, setWord] = useState();

  const [notfound, setNotfound] = useState(false);

  const [serverError, setServerError] = useState(false);

  const [error, setError] = useState(false);

  let { search } = useParams();

  const navigate = useNavigate();

  // use effet with empty dependency array [] executes only once

  useEffect(() => {
    //const url = https://httpstat.us/401;

    //const url = https://httpstavfuhfjineiv;

    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;

    fetch(url)
      .then((response) => {
        //sconsole.log(response.status);

        if (response.status === 404) {
          console.log(response.status);

          setNotfound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          setServerError(true);
        }

        if (!response.ok) {
          setError(true);

          throw new Error("page is not reachable");
        }

        return response.json();
      })

      .then((data) => {
        setWord(data[0].meanings);

        console.log(data[0].meanings);
      })

      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  if (notfound === true) {
    return (
      <>
        <NotFound />

        <Link to="/dictionary">search another word</Link>
      </>
    );
  }

  return (
    <div>
      {word ? (
        <>
          <h1>definition here: </h1>

          {word.map((meaning) => {
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
