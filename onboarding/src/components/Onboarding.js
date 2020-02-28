import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const OnboardingForm = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="user-form">
      <Form>
        <label>
          Name
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="name"
          />
          {touched.name && errors.name && (
            <p className="errors" style={{ color: "red" }}>
              {errors.name}
            </p>
          )}
        </label>
        <label>
          Email:
          <Field id="email" type="email" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p className="errors" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </label>
        <label>
          Password:
          <Field id="password" type="password" name="password" placeholder="password" />
          {touched.password && errors.password && (
            <p className="errors" style={{ color: "red" }}>
              {errors.password}
            </p>
          )}
        </label>
        <label>
          Role:
          <Field
            name="role"
            className="food-select"
            component="select"
            placeholder="role"
          >
            <option value="Frontend">Frontend</option>
            <option value="WebUI">WebUI</option>
            <option value="Backend">Backend</option>
          </Field>
        </label>
        <label htmlFor="termsOfService" className="checkbox-container">
          Terms of Service
          <Field
            id="termsOfService"
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>
        <label htmlFor="notes">
          About You:
          <Field
            id="notes"
            component="textarea"
            type="text"
            name="notes"
            placeholder="notes"
          />
        </label>
        <button type="submit">Submit!</button>
      </Form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, email,password, role, termsOfService, notes }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
      termsOfService: termsOfService || false,
      notes: notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios.post("https://reqres.in/api/users/", values).then(response => {
      console.log("success", response);
      setStatus(response.data);
      resetForm();
    });
  }
})(OnboardingForm);
export default FormikOnboardingForm;
