import React from "react";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function DefinitionSearch() {
  const [word, setWord] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <form
        className="flex space-between space-x-2 max-w-[300px]"
        onSubmit={() => {
          navigate("/Dictionary/" + word);

          // navigate helps you navigate from one page to another page without the need to click to a link
        }}
      >
        <input
          className="shrink min-w-0px px-2 py-1 rounded"
          placeholder="happiness"
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        ></input>

        <button className="bg-purple-600 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded">
          search
        </button>
      </form>
    </div>
  );
}

export default DefinitionSearch;
