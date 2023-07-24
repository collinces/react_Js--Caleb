import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { basedUrl } from "../Shared";
import AddCustomer from "../components/AddCustomer";

function Customers() {
  const url = basedUrl + "api/customers/";
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(); // by default show = undefined

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())

      .then((data) => {
        setCustomers(data.customers);
        console.log(data.customers);
      });
  }, []);

  function toggleshow() {
    setShow(!show); //
  }

  // this function add a new customer component

  function newCustomer(name, industry) {
    const infos = {
      name: name,
      industry: industry,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infos),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not able to add new customer");
        }

        return response.json();
      })

      .then((data) => {
        toggleshow();
        setCustomers([...customers, data.customer]);
        // we get the customers array and we add new customer to array by data.customer
      })

      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <h1>list of customers and their industries</h1>
      <ul>
        {customers ? (
          <>
            {customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/Customers/" + customer.id}>{customer.name}</Link>:
                </li>
              );
            })}
          </>
        ) : (
          <p>loadind...</p>
        )}
      </ul>
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleshow={toggleshow}
      />
    </div>
  );
}

export default Customers;
