import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../store/auth-context"
import "./Login.css";
import classes from "../Form.module.css";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup.string().required("*Password is required!"),
});



const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const userCredential = await loginUser(formData.email, formData.password);
      const user = userCredential.user;
      setUser(user);
      if (formData) {
        Swal.fire({
          title: 'Welcome to I Trip World',
          text: 'Your Travel Partner.',
          imageUrl: 'https://i.ibb.co/GCWvgQZ/travel.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
      } else {
        Swal.fire("Welcome!", "You've logged in Successfully !", "success");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please register an account.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className={`${classes.formContainer} d-flex justify-content-center align-items-center`}>
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <h2>Login</h2>
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
                  type={showPassword ? "text" : "password"}
                  className={classes.input}
                  {...register("password")}
                />
                {errors.password?.message && (
                  <small className="error">{errors.password.message}</small>
                )}
              </FloatingLabel>
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />{" "}
                Show Password
              </label>
              <button type="submit" className={`btn ${classes.formSubmitBtn}`}>
                Login
              </button>
              <p className={`text-center ${classes.haveAccount}`}>
                Don't have an account?{" "}
                <Link to="/register" className={`${classes.forgotPassword}`} style={{ color: 'black' }}>
                  Signup
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
        <Toaster />
      </Container>
    </section>
  );
};

export default Login;

