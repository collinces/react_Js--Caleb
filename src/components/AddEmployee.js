// AddEmployee is a component that handle our static backdrop Popup modal with react bootstrap when we click addEmployee button

// the starter codes for this component was taken from https://react-bootstrap.netlify.app/docs/components/modal/ and then edited to meet our need

import { useState } from "react";

//import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

function AddEmployee(props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [img, setImg] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true); // handleshow is the function that allows the modal to Popup

  return (
    <>
      <button
        onClick={handleShow}
        className="block mx-auto m-2 bg-purple-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Employee
        {/* pop up modal is access through this button */}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* inline form tags is inserted in the pop up modal body to collect input.

          the template code for the inline form was taken from

          https://v1.tailwindcss.com/components/forms and edited to suit our need */}

          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent the page to refresh

              setName("");

              setRole("");

              setImg("");

              props.newEmployee(name, role, img); // new values entered in inline form by users are passed to the updateEmployee function for updates
            }}
            id="editmodal"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                Full name
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="EmployeeName"
                placeholder="smite"
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
                placeholder="devops"
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }} // onChange event handler helps to update the value typed
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="img"
              >
                Imgage URL
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="EmployeeImg"
                placeholder="https://google.com"
                type="text"
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                }} // onChange event handler helps to update the value typed
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            // form="editmodal" // we pass the form id to button tag so our button can have an effet to the form
            //className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>

          <button
            onClick={handleClose}
            form="editmodal" // we pass the form id to button tag so our button can have an effet to the form
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;
