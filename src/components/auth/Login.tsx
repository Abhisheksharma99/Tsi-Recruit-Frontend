// src/components/auth/Login.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig'; // Import the Axios instance

// Validation schema for the login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginData {
  message : string,
  role: string,
  token: string
}
interface LoginResponse {
  data: LoginData
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response: LoginResponse = await axios.post('/auth/login', values); // API call to login
      const { message, role, token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the dashboard or appropriate page
      role === 'Admin' ? navigate('/admin-dashboard') : role === 'Candidate' ? navigate('/candidate/dashboard') : navigate('/recruiter/dashboard'); 
      
    } catch (error) {
      console.error('Login error', error);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label>Email</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <Field type="password" name="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="text-red-600" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
