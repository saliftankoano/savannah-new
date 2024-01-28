import "./AddModal.css";
import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import AddForm from "./AddForm";
//ToolTips
import AddTlt from "./AddTlt";

export default function AddModal() {
  const [show, setShow] = useState(false);
  const [entity, setEntity] = useState("ENTITY");

  const [values, setValues] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {}, [entity]);
  useEffect(() => {}, [values]);

  async function addEntity(values) {
    let responseJson;
    try {
      const response = await fetch(`http://localhost:5172/${values.entity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.fullName,
          phone: values.phone,
          extension: values.extension,
          email: values.email,
          location: values.location,
          department: values.dept,
        }),
      });
      responseJson = await response.json();
    } catch (error) {
      alert(error);
    } finally {
      //Refetch the updated info
      let refetchEntity;
      if (values.entity === "faculty") {
        refetchEntity = await fetch(
          `http://localhost:5172/faculty/${values.fullName}`
        );
      } else if (values.entity === "staff") {
        refetchEntity = await fetch(
          `http://localhost:5172/staff/${values.fullName}`
        );
      } else {
        refetchEntity = await fetch(
          `http://localhost:5172/department/${values.fullName}`
        );
      }

      const refetchResp = await refetchEntity.json();
      if (values.entity !== "departments") {
        alert(
          `Successfuly Added the ${values.entity} with Id: ${refetchResp.id}, name: ${refetchResp.name}, phone: ${refetchResp.phone}, extension: ${refetchResp.phone}, email: ${refetchResp.email}, location: ${refetchResp.location}, department: ${refetchResp.dept}`
        );
      } else {
        alert(
          `Successfuly Added the ${values.entity} with Id: ${refetchResp.id}, name: ${refetchResp.name}, phone: ${refetchResp.phone}, extension: ${refetchResp.phone}, email: ${refetchResp.email}, location: ${refetchResp.location}`
        );
      }
    }
  }
  function changeEntity(entity) {
    setEntity(entity);
  }
  const handleFormSubmit = (formValues) => {
    setValues(formValues);
    addEntity(formValues);
    handleClose();
  };
  return (
    <>
      <span onClick={handleShow}>
        <AddTlt />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="add-modal-header">
          <Modal.Title id="add-modal-title">ADD {entity}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="add-modal-body">
          <AddForm updateTitle={changeEntity} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}
