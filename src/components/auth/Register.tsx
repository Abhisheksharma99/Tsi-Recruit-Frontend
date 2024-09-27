import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema for the registration form
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; email: string; password: string; role: string }) => {
    try {
      await axios.post('/api/auth/register', values);
      alert('Registration successful');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Error during registration', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', role: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label>Username</label>
              <Field type="text" name="username" className="input-field" />
              <ErrorMessage name="username" component="div" className="text-red-600" />
            </div>
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
            <div className="mb-4">
              <label>Role</label>
              <Field as="select" name="role" className="input-field">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Candidate">Candidate</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-600" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
