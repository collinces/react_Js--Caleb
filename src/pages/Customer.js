import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "../components/NotFound";
import { basedUrl } from "../Shared";

function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [notfound, setNotfound] = useState();
  const url = basedUrl + "/api/customers/" + id;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //navigate("/404/");
          setNotfound(true);
        }
        return response.json();
      })

      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
      {notfound ? <NotFound /> : null}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : (
        <p>loadind page...</p>
      )}

      <Link to="/Customers/">Go back</Link>
    </>
  );
}

export default Customer;
