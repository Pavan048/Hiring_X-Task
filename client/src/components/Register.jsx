import React, { useState } from 'react';
import { useFormik } from 'formik';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Registration successful');
          // Handle successful registration (e.g., redirect, show success message)
        } else {
          console.error('Registration failed:', await response.text());
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
  });

  return (
    <div className="App">
      <h2>Register</h2>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && <div className="errors">{formik.errors.name}</div>}

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <div className="errors">{formik.errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
        {formik.errors.password && <div className="errors">{formik.errors.password}</div>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && (
          <div className="errors">{formik.errors.confirmPassword}</div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
