import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "collince", role: "data engineer", img: "./love.jpeg" },
    { id: 2, name: "milena", role: "dbo director", img: "./pic.jpeg" },
    { id: 3, name: "michele", role: "intern", img: "./sweet.jpeg" },
    { id: 4, name: "nathan", role: "eat-sleep", img: "./mom-baby.jpeg" },
    { id: 5, name: "frank", role: "director", img: "./moma-baby.jpeg" },
    { id: 6, name: "giresse", role: "IT support", img: "./baby.jpeg" },
  ]); // each curly braces is an object. objects are stored in employess array

  function updateEmployee(id, newName, newRole) {
    console.log("update employee attribut values in app.js");
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole }; //returning each object of employee's array using spreading techniq
      }

      return employee;
    });
    setEmployees(updatedEmployees);
  }

  const showEmployee = true;
  return (
    <div className="App">
      {showEmployee ? (
        <>
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee} // here a method/function is passed as a props
                />
              ); //because we are wihtin a function, we use return statement
            })}
          </div>
        </>
      ) : (
        <p>no access </p>
      )}
    </div>
  );
}

export default App;
