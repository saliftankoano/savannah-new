import "./UpdateModal.css";
import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import UpdateForm from "./UpdateForm";
import UpdateTlt from "./UpdateTlt";

export default function UpdateModal() {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {}, [values]);
  async function updateEntity(values) {
    let entityResponse;
    let responseJson;
    try {
      const fetchedEntity = await fetch(
        `http://localhost:5172/entity/${values.id}/${values.entity}`
      );
      entityResponse = await fetchedEntity.json();
      // console.log(entityResponse);
    } catch (error) {
      alert(
        `Failed! The ${values.entity} with Id: ${values.id} does not exist.`
      );
    } finally {
      if (entityResponse.error) {
        alert(
          `Failed! The ${values.entity} with Id: ${values.id} does not exist.`
        );
        return;
      } else {
        const response = await fetch(
          `http://localhost:5172/update/${values.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              entity: values.entity,
              name: values.fullName,
              phone: values.phone,
              extension: values.extension,
              email: values.email,
              location: values.location,
              department: values.dept,
            }),
          }
        );
        responseJson = await response.json();
        //Refetch the updated info
        const refetchEntity = await fetch(
          `http://localhost:5172/entity/${values.id}/${values.entity}`
        );
        const refetchResp = await refetchEntity.json();
        // console.log(refetchResp);
        alert(
          `Successfuly updated new Info is: ${values.entity} with Id: ${refetchResp.id}, name: ${refetchResp.name}, phone: ${refetchResp.phone}, extension: ${refetchResp.phone}, email: ${refetchResp.email}, location: ${refetchResp.location}, department: ${refetchResp.dept}`
        );
      }
    }
  }

  const handleFormSubmit = (formValues) => {
    // console.log("Form values received in parent component:", formValues);
    setValues(formValues);
    updateEntity(formValues);
    handleClose();
  };

  return (
    <>
      <span onClick={handleShow}>
        <UpdateTlt />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title id="modal-title">UPDATE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateForm onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}
