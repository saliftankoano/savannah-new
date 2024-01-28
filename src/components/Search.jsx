import "./Search.css";
import { React, useState, useEffect } from "react";
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
  allTriangles = document.getElementsByClassName("triangle-box");
  //   console.log(allTriangles);
});

async function getAllDepts() {
  const response = await fetch("http://localhost:5172/depts");
  const depts = await response.json();

  let finalResults = [];
  depts.forEach((element) => {
    finalResults.push(element);
  });
  // console.log(finalResults);
  return finalResults;
}

//Search function Start
export default function Search() {
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

  const [departments, setDepartments] = useState();
  useEffect(() => {
    async function fetchData() {
      const fetchedDepartments = await getAllDepts();
      // console.log("Fetched Departments:", fetchedDepartments);
      setDepartments(fetchedDepartments);
    }

    fetchData(); // Call the function directly without including departments in the dependency array
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    getAllFaculty();
  }, []); // Include departments in the dependency array

  useEffect(() => {}, [colDefs]);
  useEffect(() => {}, [rowData]);

  async function getAllFaculty() {
    const response = await fetch(`http://localhost:5172/faculty`);
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
        // console.log(currentClasses);
        currentOption = currentClasses[0];
        console.log(currentOption);
        //
        const keywordElement = document.getElementById("keyword-in");
        console.log(keywordElement);
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
    console.log(departments);
    return departments ? (
      departments.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))
    ) : (
      <option value="">Loading...</option>
    );
  }
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }
  function handleDeptChange(event) {
    setDepartment(event.target.value);
  }
  async function specificFaculty(specificFaculty) {
    const response = await fetch(
      `http://localhost:5172/faculty/${specificFaculty}`
    );
    const faculty = await response.json();
    delete faculty.id;
    return [faculty];
  }
  async function specificStaff(specificStaff) {
    const response = await fetch(
      `http://localhost:5172/staff/${specificStaff}`
    );
    const staff = await response.json();
    delete staff.id;
    return [staff];
  }
  async function specificDept(specificDept) {
    const response = await fetch(
      `http://localhost:5172/department/${specificDept}`
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

  return (
    <div className="search-section container-fluid">
      <div className="row title-row">
        <div className="col-lg-12 col-md-12">
          <h1 id="title">DIRECTORY</h1>
        </div>
      </div>
      <div className="row options-row">
        <div
          className="faculty option col-lg-4 col-md-4 col-4 entities d-inline-flex justify-content-start"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Faculty
        </div>
        <div
          className="staff option col-lg-4 col-md-4 col-4 entities d-inline-flex justify-content-center"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Staff
        </div>
        <div
          className="department option col-lg-4 col-md-4 col-4 entities d-inline-flex justify-content-center"
          onClick={(e) => {
            visisbleToggle(e.target);
          }}
        >
          Departments
        </div>
      </div>
      <div className="row triangles-row">
        <div className="col-lg-4 col-md-4 col-4 d-flex justify-content-start">
          <div className="col-lg-1 col-md-1 col-2"></div>
          <div className="triangle-box"></div>
        </div>
        <div className="col-lg-4 col-md-4 col-4 d-flex justify-content-center">
          <div className="triangle-box  hidden"></div>
        </div>
        <div className="col-lg-4 col-md-4 col-4 d-flex justify-content-center">
          <div className="triangle-box hidden"></div>
        </div>
      </div>
      <form className="row form-items">
        <div className="ms-lg-1 ms-md-1 search-bx d-lg-flex d-md-flex d-block justify-content-lg-center align-items-lg-center justify-content-md-center align-items-md-center">
          <div className="col-lg-4 col-md-4 col-12 d-flex align-items-lg-center justify-content-center mx-auto">
            <input
              id="keyword-in"
              value={keyword}
              type="text"
              name="name"
              placeholder="Search by keyword"
              onChange={handleKeywordChange}
            />
          </div>
          <div className="col-lg-4 col-md-4 col-12 select-bx d-flex align-items-lg-center justify-content-center mx-auto">
            <select
              id="depts-in"
              name="depts"
              onChange={handleDeptChange}
              value={department}
            >
              {displayDepts(departments)}
            </select>
          </div>
          <div className="col-lg-4 col-md-4 col-12 submit-bx d-flex align-items-lg-center justify-content-center mx-auto">
            <input
              id="submit-search-in"
              type="submit"
              value={"SEARCH"}
              onClick={submitHandler}
            />
          </div>
        </div>
      </form>
      <div className="row tip-home">
        <div className="col-lg-12 col-md-12">
          <h2 className="search-tip">
            Tip💡: You can slide & move the header bars
          </h2>
        </div>
      </div>
      <div className="row ag-grid">
        <div
          className={
            "col-lg-12 col-md-12 ag-theme-quartz-dark ag-theme-savannah"
          }
          style={{
            width: "100%",
            color: "white",
            fontWeight: 400,
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
    </div>
  );
}
