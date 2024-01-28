import "./Modal1.css";
import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const departments = await getAllDepts();
async function getAllDepts() {
  const response = await fetch("http://localhost:5172/depts");
  const depts = await response.json();

  let finalResults = [];
  depts.forEach((element) => {
    finalResults.push(element.name);
  });

  return finalResults;
}

export default function Modal1() {
  const [department, setDepartment] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [extension, setExtension] = useState("");
  const [email, setEmail] = useState("");

  function displayDepts(departments) {
    let sortedDepts = [...departments.sort()];
    return sortedDepts.map((option) => (
      <option key={option} value={option.name}>
        {option}
      </option>
    ));
  }

  return (
    <div className="container-fluid">
      <div
        className="modal modal-sheet position-static d-block p-4 py-md-5"
        tabIndex="-1"
        role="dialog"
        id="addEmployee"
      >
        <div className="w-75 modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Add Employee</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-5 pt-0">
              <form className="row g-3">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="validationDefault01" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    placeholder="Mark Morris"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    maxLength={90}
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="validationDefault03" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault03"
                    placeholder="CSI-234"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    maxLength={20}
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="validationDefault02" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault02"
                    placeholder="747-712-9812"
                    maxLength={12}
                    required
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="validationDefault03" className="form-label">
                    Extension
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault03"
                    placeholder="9812"
                    maxLength={4}
                    required
                    onChange={(e) => setExtension(e.target.value)}
                    value={extension}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label
                    htmlFor="validationDefaultUsername"
                    className="form-label"
                  >
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-envelope"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="example@savannah.com"
                      required
                      maxLength={255}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <label htmlFor="validationDefault04" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select"
                    id="validationDefault04"
                    required
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                  >
                    <option defaultValue="Select Department">
                      Select Department...
                    </option>
                    {displayDepts(departments)}
                  </select>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    className="col-lg-11 col-md-11 col-sm-11 col-11 btn btn-primary"
                    type="submit"
                  >
                    Add New Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
