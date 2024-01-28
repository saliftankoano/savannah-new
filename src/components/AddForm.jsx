import "./AddForm.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as yup from "yup";

export default function BasicForm({ onSubmit, updateTitle }) {
  const [departments, setDepartments] = useState([]);
  const [fullName, setFullName] = useState("Full name");
  const [showDept, setShowDept] = useState(true);

  useEffect(() => {}, [departments]);
  useEffect(() => {}, [fullName]);
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
    //Used to validate the fields overall form
    validationSchema: yup.object().shape({
      entity: yup.string().required("Entity is required"),
      fullName: yup.string().required("Full name is required"),
      location: yup.string().required("Location is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format"),
      extension: yup
        .string()
        .required("Extension is required")
        .matches(/^\d+$/, "Extension must be a numeric value")
        .max(4, "Extension must be at most 4 digits"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
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
    // When form is submitted these functions will be triggered
    onSubmit: (values, { resetForm }) => {
      onSubmit(values); // Function in AddModal will be triggered with the form data
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

  const handleChange = (e, field) => {
    formik.handleChange(e); // Use formik's handleChange
    if (field === "entity") {
      updateTitle(e.target.value.toUpperCase());
      if (e.target.value === "departments") {
        setFullName("Name");
        setShowDept(false);
      } else {
        setFullName("Full name");
        setShowDept(true);
      }
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

      <Row className="mb-3 AddFullName">
        <Form.Group
          md="4"
          controlId="addFullName"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="fullNameLabel" label={fullName}>
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
              isValid={!formik.errors.fullName && formik.touched.fullName}
              isInvalid={!formik.touched || formik.errors.fullName}
              maxLength={90}
              placeholder="Mark Morris"
            />
          </FloatingLabel>
          <Feedback type="invalid"></Feedback>
          <Feedback type="valid"></Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 AddLocation">
        <Form.Group
          md="4"
          controlId="AddLocation"
          className="position-relative col-lg-12"
        >
          <FloatingLabel controlId="AddlocationLabel" label="Location">
            <Form.Control
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              placeholder="CSI-234"
              maxLength={20}
              isInvalid={formik.errors.location}
              isValid={!formik.errors.location && formik.touched.location}
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
      <Row className="mb-3 AddPhone">
        <Form.Group
          className="position-relative col-lg-12"
          md="4"
          controlId="AddPhone"
        >
          <InputGroup hasValidation className="position-relative">
            <FloatingLabel controlId="AddPhoneLabel" label="Phone">
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
                isValid={formik.touched.phone && !formik.errors.phone}
                isInvalid={!!formik.touched && formik.errors.phone}
                maxLength={12}
              />
            </FloatingLabel>

            <Feedback type="invalid" tooltip>
              {formik.errors.entity}
            </Feedback>
            <Feedback type="valid"></Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3 AddExtension">
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
              isValid={formik.touched.extension && !formik.errors.extension}
              isInvalid={!!formik.touched.extension && formik.errors.extension}
              maxLength={4}
            />
          </FloatingLabel>

          <Feedback type="invalid">{formik.errors.entity}</Feedback>
          <Feedback type="valid"></Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 email">
        <Form.Group controlId="email" className="position-relative col-lg-12">
          <FloatingLabel controlId="emailLabel" label="Email">
            <Form.Control
              type="email"
              placeholder="example@savannah.com"
              pattern="^.+@.+\..+$"
              name="email"
              value={formik.values.email}
              onChange={(e) => formik.handleChange(e)}
              isInvalid={formik.errors.email}
              isValid={!formik.errors.email && formik.touched.email}
              maxLength={255}
            />
          </FloatingLabel>

          <Feedback type="invalid" tooltip>
            {formik.errors.email}
          </Feedback>
          <Feedback type="valid" tooltip></Feedback>
        </Form.Group>
      </Row>
      {showDept && (
        <Row className="mb-3 addDepartment">
          <Form.Group
            md="3"
            controlId="validationFormik105"
            className="position-relative d-flex-column align-items-end col-lg-12"
          >
            <Form.Select
              name="dept"
              value={formik.values.dept}
              onChange={(e) => formik.handleChange(e)}
              isInvalid={formik.errors.dept}
              isValid={!formik.errors.dept && formik.values.dept != ""}
            >
              <option value="">Select a department</option>
              {displayDepts(departments)}
            </Form.Select>

            <Feedback type="invalid"></Feedback>
            <Feedback type="valid"></Feedback>
          </Form.Group>
        </Row>
      )}
      <Row>
        <Button type="submit" className="col-lg-11 m-auto update-form-btn">
          ADD
        </Button>
      </Row>
    </Form>
  );
}
