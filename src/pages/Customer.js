import React from "react";
import { useParams, Link, useNavigate, json } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "../components/NotFound";
import { basedUrl } from "../Shared";

function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notfound, setNotfound] = useState();
  const [change, setChange] = useState(false);
  const [error, setError] = useState();

  const url = basedUrl + "/api/customers/" + id;

  useEffect(() => {
    // this useEffect execute second at lunch
    if (!customer) return;
    if (!tempCustomer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) {
      equal = false;
    }
    if (customer.industry !== tempCustomer.industry) {
      equal = false;
    }
    if (equal) {
      setChange(false);
    }
  });

  useEffect(() => {
    // this useEffect execute first at lunch
    fetch(url) // go to database api and fetch customer data
      .then((response) => {
        if (response.status === 404) {
          //navigate("/404/");
          setNotfound(true);
        }

        if (!response.ok) {
          throw new Error("cannot connect to backend api");
        }
        return response.json(); // return customer data in json format
      })

      .then((data) => {
        setCustomer(data.customer); // assign customer data to customer state variable
        setTempCustomer(data.customer); // we copy customer value into TempCustomer
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  // useEffect is guarenteed to execute each time a state variable is modified. useEffect helps to get the most up to date value of a state variable
  // useEffect execute automatically

  function updateCustomer() {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("request did not go through");
        }
        return json.response;
      })
      .then(() => {
        setCustomer(tempCustomer);
        setChange(false);
        setError(undefined);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }

  // program begins here
  return (
    <>
      {notfound ? <NotFound /> : null}

      {customer ? ( // if there is a customer value then do the below
        <div>
          <input // input box for customer.name
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name} // save input value into tempCustomer.name
            onChange={(e) => {
              setChange(true); // mark the change as true
              setTempCustomer({ ...tempCustomer, name: e.target.value }); // add value to name property of object tempCustomer
            }}
          />
          <input // input box for customer.insdustry
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setChange(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />

          {change ? ( //  if change is true then display both button Cancel and Save
            <>
              <button
                className="m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer }); // if cancel restore initial value displayed in input box
                  setChange(false); // mark the change as false
                  setError(undefined);
                }}
              >
                Cancel
              </button>

              <button className="m-2" onClick={updateCustomer}>
                Save
              </button>
            </>
          ) : null}

          <button
            className="m-2"
            onClick={(e) => {
              fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      "cannot delete: backend api not accessible"
                    );
                  }

                  navigate("/Customers/");
                })

                .catch((e) => {
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      <br />

      {error ? <p>{error}</p> : null}

      <Link to="/Customers/">Go back</Link>
    </>
  );
}

export default Customer;
