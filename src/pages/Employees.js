import "../index.css";

import Employee from "../components/Employee";

import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import AddEmployee from "../components/AddEmployee";

import EditEmployee from "../components/EditEmployee";

//import Header from "../components/Header";

function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "collince", role: "data engineer", img: "./love.jpeg" },

    { id: 2, name: "milena", role: "dbo director", img: "./pic.jpeg" },

    { id: 3, name: "michele", role: "intern", img: "./sweet.jpeg" },

    { id: 4, name: "nathan", role: "eat-sleep", img: "./mom-baby.jpeg" },

    { id: 5, name: "frank", role: "director", img: "./moma-baby.jpeg" },

    { id: 6, name: "giresse", role: "IT support", img: "./baby.jpeg" },
  ]); // each curly braces is an object. objects are stored in employess array

  // this function uptadates the employee infos entered from EditEmployee

  function updateEmployee(id, newName, newRole) {
    console.log("update employee attribut values in app.js");

    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        // id is used to identify which employee info is modified

        return { ...employee, name: newName, role: newRole }; //returning each object of employee's array using spreading techniq
      }

      return employee;
    });

    // setEmployees apply the update

    setEmployees(updatedEmployees);
  }

  // this function add a new employee component

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),

      name: name,

      role: role,

      img: img,
    };

    setEmployees([...employees, newEmployee]); // new employee is addedd to employees array
  }

  const showEmployee = true;

  return (
    <div className="bg-gray-300 min-h-screen">
      {showEmployee ? (
        <>
          <div className="flex flex-wrap justify-center ">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );

              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee} // here a component is passed as a props
                />
              ); //because we are wihtin a function, we use return statement
            })}
          </div>

          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>no access </p>
      )}
    </div>
  );
}

export default Employees;
