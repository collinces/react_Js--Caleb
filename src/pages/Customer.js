import {
  useParams,
  Link,
  useNavigate,
  json,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NotFound from "../components/NotFound";
import { basedUrl } from "../Shared";
import { loginContext } from "../App";

function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notfound, setNotfound] = useState();
  const [change, setChange] = useState(false);
  const [error, setError] = useState();

  const [loggedIn, setLoggedIn] = useContext(loginContext);

  const url = basedUrl + "/api/customers/" + id;

  useEffect(() => {
    // this useEffect execute second at lunch
    if (!customer) return; // if no customer return back
    if (!tempCustomer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) {
      // if the customer name in backend db is different from frontend then set equality to false
      equal = false;
    }
    if (customer.industry !== tempCustomer.industry) {
      // same here
      equal = false;
    }
    if (equal) {
      // equal = true means there was no change in customer name or industry
      setChange(false);
    }
  });

  useEffect(() => {
    // this useEffect execute first at lunch
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }) // go to database api and fetch customer data
      .then((response) => {
        if (response.status === 404) {
          //navigate("/404/");
          setNotfound(true);
        } else if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", { state: { previousUrl: location.pathname } });
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

  function updateCustomer(e) {
    e.preventDefault(); // prevent the page to refresh

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", { state: { previousUrl: location.pathname } });
        }
        if (!response.ok) {
          throw new Error("request did not go through");
        }
        return json.response;
      })
      .then(() => {
        setCustomer(tempCustomer); // update customer value
        setChange(false); // after updating set the change to false so save button and cancel button are not displayed
        setError(undefined); // clear error message
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }

  // program begins here
  return (
    <div className="p-3">
      {notfound ? <NotFound /> : null}

      {customer ? ( // if there is a customer value then do the below
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>

              <div className="md:w-3/5">
                <input // input box for customer.name
                  id="name"
                  //className="m-2 block px-2"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={tempCustomer.name} // save input value into tempCustomer.name
                  onChange={(e) => {
                    setChange(true); // mark the change as true
                    setTempCustomer({ ...tempCustomer, name: e.target.value }); // add value to name property of object tempCustomer
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-4">
              <div className="md:w-1/4">
                <label for="industry">Industry</label>
              </div>

              <div className="md:w-3/5">
                <input // input box for customer.insdustry
                  id="industry"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChange(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>

          {change ? ( //  if change is true then display both button Cancel and Save
            <>
              <div className="m-2">
                <button
                  className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={(e) => {
                    setTempCustomer({ ...customer }); // if cancel restore initial value displayed in input box
                    setChange(false); // mark the change as false
                    setError(undefined); // to say do not display any error message if ok
                  }}
                >
                  Cancel
                </button>

                <button
                  form="customer" // we pass the form id to button so save button can submit the form
                  className=" bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </>
          ) : null}

          <div>
            <button
              className="m-2 bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                })
                  .then((response) => {
                    if (response.status === 401) {
                      setLoggedIn(false); // if trying to delete wihtout being logged in, set loggedIn to false and redirect user to login page
                      navigate("/login", {
                        state: { previousUrl: location.pathname }, // after logged in redirect user to this location
                      });
                    }
                    if (!response.ok) {
                      throw new Error(
                        "cannot delete: backend api not accessible"
                      );
                    }

                    navigate("/Customers/"); // navigate to this link after succesful delete
                  })

                  .catch((e) => {
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      <br />

      {error ? <p>{error}</p> : null}

      <Link to="/Customers/">
        <button className=" no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded">
          ← Go back
        </button>
      </Link>
    </div>
  );
}

export default Customer;
