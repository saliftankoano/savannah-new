import "./RemoveModal.css";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import RemoveForm from "./RemoveForm";
import RemoveTlt from "./RemoveTlt";

export default function RemoveModal() {
  const [show, setShow] = useState(false); //Handles the display of the Modal
  const [values, setValues] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (formValues) => {
    // console.log("Form values received in parent component:", formValues);
    setValues(formValues);
    removeEntity(formValues);
    handleClose();
  };
  async function removeEntity(values) {
    let entityResponse;
    let responseJson;

    try {
      const fetchedEntity = await fetch(
        `http://localhost:5172/entity/${values.id}/${values.entity}`
      );
      entityResponse = await fetchedEntity.json();
      // console.log(entityResponse);
      if (entityResponse.error) {
        alert(
          `Failed! The ${values.entity} with Id: ${values.id} does not exist.`
        );
        return;
      }
    } catch (error) {
      alert(error);
    } finally {
      const response = await fetch(
        `http://localhost:5172/delete/${values.entity}&${values.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(
        `Successfuly Removed the: ${values.entity}, ${entityResponse.name} with Id: ${values.id}`
      );
    }
  }
  return (
    <>
      <span onClick={handleShow}>
        <RemoveTlt />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title id="modal-title">DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RemoveForm onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}
