import React from 'react';
import { useFormik } from 'formik';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Login successful');
          // Handle successful login (e.g., redirect, show success message)
        } else {
          console.error('Login failed:', await response.text()); // More informative error handling
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
  });

  return (
    <div className="App">
      <h2>Login</h2>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Handle validation on blur for better UX
        />
        {formik.touched.email && formik.errors.email && ( // Show errors only after field is touched
          <div className="errors">{formik.errors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="errors">{formik.errors.password}</div>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
