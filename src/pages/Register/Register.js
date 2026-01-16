import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import classes from "../Form.module.css";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { AuthContext } from "../../store/auth-context";
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth functions
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { toast, Toaster } from "react-hot-toast";
const firebaseConfig = {
  apiKey: "AIzaSyAEyHzJHpObcc2zzitArm-Fi-FCOrIAmzo",
  authDomain: "itrip-world-ce7e6.firebaseapp.com",
  projectId: "itrip-world-ce7e6",
  storageBucket: "itrip-world-ce7e6.firebasestorage.app",
  messagingSenderId: "176660109572",
  appId: "1:176660109572:web:ad4b52076cb95fce3f5851"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const schema = yup.object().shape({
  name: yup.string().required("*Name is required!"),
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup
    .string()
    .required("*Password is required!")
    .min(8, "Password must have at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("*Confirm Password is required!")
    .oneOf([yup.ref("password")], "*Passwords must match!"),
});
const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  const onSubmit = async (formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const userDocRef = doc(db, "Users", user.uid);
      await setDoc(userDocRef, {
        UserName: formData.name,
        email: formData.email,
      });

      history.push("/");
    } catch (error) {
      // console.error("Error creating user:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use please try different email address");
      }
    }
  };

  return (
    <section
      className={`${classes.formContainer} d-flex justify-content-center align-items-center`}
    >
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <h2>Create an account</h2>
              <FloatingLabel label="Name" className={`${classes.label} mb-3`}>
                <Form.Control
                  placeholder="Name"
                  className={classes.input}
                  {...register("name")}
                />
                {errors.name?.message && (
                  <small className="error">{errors.name.message}</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Email" className={`${classes.label} mb-3`}>
                <Form.Control
                  placeholder="Email"
                  className={classes.input}
                  {...register("email")}
                />
                {errors.email?.message && (
                  <small className="error">{errors.email.message}</small>
                )}
              </FloatingLabel>
              <FloatingLabel
                label="Password"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Password"
                  maxLength="8"
                  className={classes.input}
                  {...register("password")}
                />
                {errors.password?.message && (
                  <small className="error">{errors.password.message}</small>
                )}
              </FloatingLabel>

              <FloatingLabel
                label="Confirm Password"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Confirm Password"
                  className={classes.input}
                  maxLength="8"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword?.message && (
                  <small className="error">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </FloatingLabel>

              <button type="submit" className={`btn ${classes.formSubmitBtn}`}>
                Create an account
              </button>
              {/* Toggle login */}
              <p className={`text-center ${classes.haveAccount}`}>
                Already have an account?{" "}
                <Link to="/login" className={`${classes.forgotPassword}`} style={{ color: 'black' }}>
                  Login
                </Link>
              </p>
            </Form>
            {/* Social login */}
            {/* <SocialLogin /> */}
          </Col>
        </Row>
      </Container>
      <Toaster />
    </section>
  );
};

export default Register;
