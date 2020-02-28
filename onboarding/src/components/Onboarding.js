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
          <Field id="size" type="email" name="size" placeholder="size" />
          {touched.size && errors.size && (
            <p className="errors" style={{ color: "red" }}>
              {errors.size}
            </p>
          )}
        </label>
        <label>
          Role:
          <Field
            name="diet"
            className="food-select"
            component="select"
            placeholder="diet"
          >
            <option value="Herbivore">Herbivore</option>
            <option value="Carnivore">Carnivore</option>
            <option value="Omnivore">Omnivore</option>
          </Field>
        </label>
        <label htmlFor="vaccinations" className="checkbox-container">
          Terms of Service
          <Field
            id="vaccinations"
            type="checkbox"
            name="vaccinations"
            checked={values.vaccinations}
          />
          <span className="checkmark" />
        </label>
        <label htmlFor="notes">
          deScript0re:
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
          <li>Size: {user.size}</li>
          <li>Food: {user.diet}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, size, diet, vaccinations, notes }) {
    return {
      name: name || "",
      size: size || "",
      diet: diet || "",
      vaccinations: vaccinations || false,
      notes: notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    size: Yup.string().required()
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
