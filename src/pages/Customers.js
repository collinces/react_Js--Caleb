import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { basedUrl } from "../Shared";
import AddCustomer from "../components/AddCustomer";
import { loginContext } from "../App";
import useFetch from "../hooks/UseFetch";

function Customers() {
  const url = basedUrl + "api/customers/";
  //const [customers, setCustomers] = useState();
  const [show, setShow] = useState(); // by default show = undefined

  const [loggedIn, setLoggedIn] = useContext(loginContext); // initialiase loggedIn to loginContext(true)

  const {
    request,
    appendData,
    data: { customers } = {}, // grab props customers in data, initialize to empty
    errorStatus,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`, // passing authorization request token
    },
  });

  useEffect(() => {
    request(); // display customers list
  }, []);

  // useEffect(() => {
  //   console.log(request, appendData, customers, errorStatus);
  // });

  function toggleshow() {
    setShow(!show); //
  }

  // this function add a new customer component
  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });

    if (!errorStatus) {
      toggleshow(); // pop up modal disappear after we add new customer
    }
  }

  return (
    <div>
      <h1>list of customers and their industries</h1>

      {customers ? ( // is there any customer in customers array
        <div>
          {customers.map((customer) => {
            return (
              <div className="m-2" key={customer.id}>
                <Link to={"/Customers/" + customer.id}>
                  <button className=" no-underline bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>loadind...</p>
      )}

      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleshow={toggleshow}
      />
    </div>
  );
}

export default Customers;
