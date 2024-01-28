import "./Dashboard.css";
//Bootstrap
import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//AG GRID
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
//Savannah Uv Logo
import logo from "./assets/sv-uv.png";
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import RemoveModal from "./components/RemoveModal";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const Navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  // Check if state is available before accessing its properties
  if (!state) {
    // Handle the case where state is not available
    navigate("/lost");
  }

  const { username, password } = state;

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "phone" },
    { field: "extension" },
    { field: "email" },
    { field: "location" },
    { field: "dept" },
  ]);
  async function getAllEmployees() {
    let allEmployees;
    let responseFac = await fetch(`http://localhost:5172/faculty`);
    responseFac = await responseFac.json();
    let responseStaff = await fetch(`http://localhost:5172/staff`);
    responseStaff = await responseStaff.json();
    let responseDepts = await fetch(`http://localhost:5172/depts`);
    responseDepts = await responseDepts.json();
    allEmployees = [...responseFac, ...responseStaff, ...responseDepts];
    setRowData(allEmployees);
  }
  useEffect(() => {
    getAllEmployees();
  }, []); // Empty dependency array to fetch data on mount

  return (
    <div className="container-fluid dashboard">
      <div className="row top">
        <div className=" col-sm-1 col"></div>
        <div className="logo-dash col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
          <img src={logo} className="img-fluid" />
        </div>
        <div className="col-5"></div>
      </div>
      <div className="row">
        <div className="col-lg-9 col-md-9 col-sm-8 col-8 text-center">
          <h2 className="dash-tip">
            Tip💡: Adjust the header width by sliding the dividers
          </h2>
        </div>
        <div className="toolbar col-lg-2 col-md-2 col-sm-3 col-3">
          <AddModal />
          <UpdateModal />
          <RemoveModal />
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1"></div>
      </div>

      <div className="row dash-grid">
        <div className="col-lg-1 col-md-1 col"></div>
        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
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
        <div className="col-md-1 col"></div>
      </div>
    </div>
  );
}
