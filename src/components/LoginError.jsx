import "./LoginError.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export default function LoginError(props) {
  const [show, setShow] = useState(props.show);

  const handleClose = () => {
    setShow(false);
    props.onClose(); // Notify the parent component that the modal is closed
  };
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="login-e-title">LOGIN ERROR!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 id="modal-message">
          Your Password or Username are wrong, try again.
        </h5>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
