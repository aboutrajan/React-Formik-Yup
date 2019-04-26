import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "./styles.css";

const App = ({ values, errors, touched, isSubmitting }) => {
  return (
    <Form className="form-section">
      <div>
        <Field
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <br />
      <div>
        <Field
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <br />
      <div>
        <label>
          <Field type="checkbox" name="subscribe" checked={values.subscribe} />
          Subscribe for more updates
        </label>
      </div>
      <br />
      <div>
        <Field component="select" name="choose">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </Field>
      </div>
      <br />
      <div>
        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </div>
    </Form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ email, password, subscribe, choose }) {
    return {
      email: email || "",
      password: password || "",
      subscribe: subscribe || true,
      choose: choose || "1"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(9, "Must be 9 character at least")
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values);
    setTimeout(() => {
      if (values.email === "rajan@yopmail.com") {
        setErrors({ email: "Email is aleady exist." });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp />, rootElement);
