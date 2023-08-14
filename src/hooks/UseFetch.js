// useFecth() is our own define hook

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useFetch(url, { method, headers, body }) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", { state: { previousUrl: location.pathname } });
        }
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }, []);
  return { data, errorStatus }; // returning an object instead of an array is called destructuring
}

export default useFetch;
