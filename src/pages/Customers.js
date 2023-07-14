import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { basedUrl } from "../Shared";

function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    fetch(basedUrl + "/api/customers/")
      .then((response) => response.json())

      .then((data) => {
        setCustomers(data.customers);
        console.log(data.customers);
      });
  }, []);

  return (
    <div>
      <h1>list of customers and their industries</h1>
      <ul>
        {customers ? (
          <>
            {customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/Customers/" + customer.id}>
                    {" "}
                    {customer.name}{" "}
                  </Link>
                  :
                </li>
              );
            })}
          </>
        ) : (
          <p>loadind...</p>
        )}
      </ul>
    </div>
  );
}

export default Customers;
