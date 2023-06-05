// EditEmployee is a component that handle our static backdrop Popup modal with react bootstrap when we click update1 button

// the starter codes for this component was taken from https://react-bootstrap.netlify.app/docs/components/modal/ and then edited to meet our need

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditEmployee(props) {
  const [name, setName] = useState(props.name); // initial value of name is props.name = value passed by parent component Employee
  const [role, setRole] = useState(props.role); // same for state variable role

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); // handleshow is the function that allows the modal to Popup

  return (
    <>
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Update1
        {/* pop up modal is access through this button */}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* inline form tags is inserted in the pop up modal body to collect input. 
          the template code for the inline form was taken from
          https://v1.tailwindcss.com/components/forms and edited to suit our need */}
          <form
            onSubmit={(e) => {
              //handleClose();
              e.preventDefault(); // prevent the page to refresh
              console.log("hello from edit employee");
              console.log(props.id, name, role);
              props.updateEmployee(props.id, name, role); // new values entered in inline form by users are passed to the updateEmployee function for updates
            }}
            id="editmodal"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="EmployeeName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="role"
              >
                Role
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="EmployeeRole"
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }} // onChange event handler helps to update the value typed
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            form="editmodal" // we pass the form id to button tag so our button can have an effet to the form
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>

          <button
            form="editmodal" // we pass the form id to button tag so our button can have an effet to the form
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Update2
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEmployee;
