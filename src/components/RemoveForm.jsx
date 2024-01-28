import "./UpdateForm.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as yup from "yup";

export default function UpdateForm({ onSubmit }) {
  const formik = useFormik({
    validationSchema: yup.object().shape({
      id: yup.number().required("ID is required"),
      entity: yup.string().required("Entity is required"),
    }),
    initialValues: {
      id: "",
      entity: "faculty",
      fullName: "",
      location: "",
      phone: "",
      extension: "",
      email: "",
      dept: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  useEffect(() => {
    // Show fullName if !== "departments"
  }, [formik.values.entity]);

  const handleChange = (e, field) => {
    formik.handleChange(e); // Use formik's handleChange

    if (field === "id") {
      const numericId = e.target.value.replace(/[^0-9]+$/, "");
      formik.setFieldValue("id", Number(numericId));
    }
  };
  return (
    <Form noValidate onSubmit={formik.handleSubmit} className=" m-l-2">
      <Row className="mb-3 modal-entities-container">
        <Form.Group
          md="3"
          controlId="validationFormik105"
          className="position-relative d-flex-column align-items-end col-lg-12"
        >
          <Form.Select
            name="entity"
            value={formik.values.entity}
            onChange={(e) => handleChange(e, "entity")}
          >
            <option defaultValue="faculty">Faculty</option>
            <option value="staff">Staff</option>
          </Form.Select>

          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.entity}
          </Form.Control.Feedback>
          <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 id">
        <Form.Group
          md="4"
          controlId="validationFormik101"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="remove-id" label="ID">
            <Form.Control
              type="text"
              name="id"
              value={formik.values.id}
              onChange={(e) => {
                const numericId = e.target.value.replace(/[^0-9]/g, "");
                formik.setFieldValue("id", numericId);
              }}
              isValid={formik.touched.id && !formik.errors.id}
              required
            />
          </FloatingLabel>

          <Feedback type="invalid" tooltip>
            {formik.errors.entity}
          </Feedback>
          <Feedback type="valid" tooltip>
            Looks good!
          </Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Button type="submit" className="col-lg-11 m-auto update-form-btn">
          DELETE
        </Button>
      </Row>
    </Form>
  );
}
