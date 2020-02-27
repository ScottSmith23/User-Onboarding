import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const OnboardingForm = ({ values, touched, errors, status }) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    console.log(status);
    status && setAnimals(animals => [...animals, status]);
  }, [status]);
  return (
    <div className="animal-form">
      <Form>
        <label>
          Name
          <Field
            id="species"
            type="text"
            name="species"
            placeholder="species"
          />
          {touched.species && errors.species && (
            <p className="errors" style={{ color: "red" }}>
              {errors.species}
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
          Diet:
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
          Vaccinations:
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
      {animals.map(animal => (
        <ul key={animal.id}>
          <li>Species: {animal.species}</li>
          <li>Size: {animal.size}</li>
          <li>Food: {animal.diet}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ species, size, diet, vaccinations, notes }) {
    return {
      species: species || "",
      size: size || "",
      diet: diet || "",
      vaccinations: vaccinations || false,
      notes: notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    species: Yup.string().required(),
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
