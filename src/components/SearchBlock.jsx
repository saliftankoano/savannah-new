import { React, useState, useEffect } from "react";
// import "./SearchBlock.css";
//AG GRID

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

let options;
let allTriangles;
let currentOption;
//When dom is loaded get the arrays of options and triangles
document.addEventListener("DOMContentLoaded", function () {
  // Get All the options and related triangles
  options = document.getElementsByClassName("option");
  currentOption = "faculty";
  allTriangles = document.getElementsByClassName("triangle");
});

async function getAllDepts() {
  const response = await fetch("https://savannah-uv-server.onrender.com/depts");
  const depts = await response.json();

  let finalResults = [];
  depts.forEach((element) => {
    finalResults.push(element);
  });
  // console.log(finalResults);
  return finalResults;
}

const departments = await getAllDepts();

function SearchBlock() {
  const [keyword, setKeyword] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "phone" },
    { field: "extension" },
    { field: "email" },
    { field: "location" },
    { field: "dept" },
  ]);

  let results;
  useEffect(() => {
    getAllFaculty();
  }, []); // Empty dependency array to fetch data on mount
  useEffect(() => {}, [colDefs]);
  useEffect(() => {}, [rowData]);

  async function getAllFaculty() {
    const response = await fetch(
      `https://savannah-uv-server.onrender.com/faculty`
    );
    results = await response.json();
    setRowData(results);
  }

  function visisbleToggle(e) {
    for (let i = 0; i < options.length; i++) {
      if (e !== options[i]) {
        allTriangles[i].classList.add("hidden");
      } else {
        allTriangles[i].classList.remove("hidden");
        //Get the name of the current option selected
        currentOption = options[i];
        currentOption = currentOption.getAttribute("class");
        const currentClasses = currentOption.split(" ");
        currentOption = currentClasses[0];

        const keywordElement = document.querySelector(".keyword-search");
        if (currentOption === "department") {
          keywordElement.style.display = "none";
        } else {
          keywordElement.style.display = "inline-flex";
        }
        // console.log(currentOption);
      }
    }
  }
  function displayDepts(departments) {
    return departments.map((option, index) => (
      <option key={index} value={option.name}>
        {option.name}
      </option>
    ));
  }
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }
  function handleDeptChange(event) {
    setDepartment(event.target.value);
  }
  async function specificFaculty(specificFaculty) {
    const response = await fetch(
      `https://savannah-uv-server.onrender.com/faculty/${specificFaculty}`
    );
    const faculty = await response.json();
    delete faculty.id;
    return [faculty];
  }
  async function specificStaff(specificStaff) {
    const response = await fetch(
      `https://savannah-uv-server.onrender.com/staff/${specificStaff}`
    );
    const staff = await response.json();
    delete staff.id;
    return [staff];
  }
  async function specificDept(specificDept) {
    const response = await fetch(
      `https://savannah-uv-server.onrender.com/department/${specificDept}`
    );
    const dept = await response.json();
    delete dept.id;
    return [dept];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(currentOption);
    // console.log(keyword);

    try {
      if (currentOption === "faculty") {
        results = await specificFaculty(keyword);
      } else if (currentOption === "staff") {
        results = await specificStaff(keyword);
      } else results = await specificDept(department);
      const newColDef = [
        { field: "name" },
        { field: "phone" },
        { field: "extension" },
        { field: "email" },
        { field: "location" },
      ];
      setColDefs(newColDef);
      setRowData(results);
      return results;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    await handleSubmit(event);
  };
  function logData(data) {
    console.log(data);
  }

  return (
    <div className="search-section">
      <h1 className="title">DIRECTORY</h1>
      <div className="options">
        <span
          className="faculty option"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Faculty
          <div className="triangle"></div>
        </span>
        <span
          className="staff option"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Staff
          <div className="triangle hidden"></div>
        </span>
        <span
          className="department option"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Departments
          <div className="triangle hidden"></div>
        </span>
      </div>

      <div className="search-box">
        <form className="faculty-search">
          <div className="search-entries">
            <input
              value={keyword}
              type="text"
              name="name"
              className="keyword-search"
              placeholder="Search by keyword"
              onChange={handleKeywordChange}
            />
            <select
              className="select-depts"
              name="depts"
              onChange={handleDeptChange}
              value={department}
            >
              {displayDepts(departments)}
            </select>
          </div>
          <input id="submit-search" type="submit" onClick={submitHandler} />
        </form>
      </div>
      <h2>Tip💡: Click on a header to sort</h2>
      <div
        className={"ag-theme-quartz-dark ag-theme-savannah"}
        style={{
          width: "100%",
          color: "white",
          marginTop: "2vh",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          alwaysShowVerticalScroll={true}
          debounceVerticalScrollbar={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          domLayout={"autoHeight"}
        />
      </div>
    </div>
  );
}
export default SearchBlock;
