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
  const [showFullName, setShowFullName] = useState(true);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {}, [departments]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5172/depts");
        const departmentObjects = await response.json();
        // console.log(departmentObjects);
        let departmentNames = [];
        departmentObjects.forEach((dept) => {
          departmentNames.push(dept.name);
        });
        // console.log(departmentNames);
        //Sort and Set departments
        const sortedDepartments = departmentNames.sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
        setDepartments(sortedDepartments);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    validationSchema: yup.object().shape({
      id: yup.number().required("ID is required"),
      entity: yup.string().required("Entity is required"),
      fullName: yup.string(),
      location: yup.string(),
      phone: yup
        .string()
        .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format"),
      extension: yup
        .string()
        .matches(/^\d+$/, "Extension must be a numeric value")
        .max(4, "Extension must be at most 4 digits"),
      email: yup.string().email("Invalid email format"),
      dept: yup.string(),
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

  function displayDepts(departments) {
    if (!departments || !departments.length) {
      return (
        <option value="Loading" disabled>
          Loading departments...
        </option>
      );
    }

    return departments.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  }

  useEffect(() => {
    // Show fullName if !== "departments"
    setShowFullName(formik.values.entity !== "departments");
  }, [formik.values.entity]);

  const handleChange = (e, field) => {
    formik.handleChange(e); // Use formik's handleChange

    if (field === "id") {
      const numericId = e.target.value.replace(/[^0-9]+$/, "");
      formik.setFieldValue("id", Number(numericId));
    } else if (field === "extension") {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      formik.setFieldValue("extension", numericValue);
    } else {
      formik.setValues((prevValues) => ({
        ...prevValues,
        [field]: e.target.value,
      }));
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
            <option value="departments">Department</option>
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
          <FloatingLabel controlId="floatingInput" label="ID">
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

      {showFullName && (
        <Row className="mb-3 fullName">
          <Form.Group
            md="4"
            controlId="validationFormik101"
            className="position-relative col-lg-12"
          >
            <FloatingLabel controlId="floatingInput" label="Full name">
              <Form.Control
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={(e) => {
                  const validFullName = e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                  );
                  formik.setFieldValue("fullName", validFullName);
                }}
                isValid={!!formik.errors.fullName}
                maxLength={90}
                placeholder="Mark Morris"
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
      )}
      <Row className="mb-3 location">
        <Form.Group
          md="4"
          controlId="validationFormik102"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="floatingInput" label="Location">
            <Form.Control
              type="text"
              name="location"
              values={formik.values.location}
              onChange={handleChange}
              placeholder="CSI-234"
              maxLength={20}
              isValid={!!formik.errors.location}
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
      <Row className="mb-3 phone">
        <Form.Group
          className="position-relative col-lg-12"
          md="4"
          controlId="validationFormikphone2"
        >
          <InputGroup hasValidation className="position-relative">
            <FloatingLabel controlId="floatingInput" label="Phone">
              <Form.Control
                type="text"
                placeholder="747-712-9812"
                aria-describedby="inputGroupPrepend"
                name="phone"
                value={formik.values.phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = numericValue.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                  );
                  formik.setFieldValue("phone", formattedValue);
                }}
                isInvalid={!!formik.errors.phone}
                maxLength={12}
              />
            </FloatingLabel>

            <Feedback type="invalid" tooltip>
              {formik.errors.entity}
            </Feedback>
            <Feedback type="valid" tooltip>
              Looks good!
            </Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3 extension">
        <Form.Group
          md="6"
          controlId="validationFormik103"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="floatingInput" label="Extension">
            <Form.Control
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="9812"
              name="extension"
              value={formik.values.extension}
              onChange={formik.handleChange}
              onBlur={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                formik.setFieldValue("extension", numericValue);
                formik.handleBlur(e);
              }}
              isInvalid={!!formik.errors.extension}
              maxLength={4}
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
      <Row className="mb-3 email">
        <Form.Group
          controlId="validationFormik104"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="floatingInput" label="Email">
            <Form.Control
              type="email"
              placeholder="example@savannah.com"
              pattern="^.+@.+\..+$"
              name="email"
              values={formik.values.email}
              onChange={handleChange}
              isInvalid={!!formik.errors.email}
              maxLength={255}
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
      <Row className="mb-3 modal-select-container">
        <Form.Group
          md="3"
          controlId="validationFormik105"
          className="position-relative d-flex-column align-items-end col-lg-12"
        >
          <Form.Select
            name="dept"
            value={formik.values.dept}
            onChange={(e) => formik.handleChange(e)}
          >
            {showFullName && <option value="">Original department</option>}

            {displayDepts(departments)}
          </Form.Select>

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
          ADD
        </Button>
      </Row>
    </Form>
  );
}
