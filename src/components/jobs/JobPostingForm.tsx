import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';

// Validation schema
const JobSchema = Yup.object().shape({
  title: Yup.string().required('Job title is required'),
  description: Yup.string().required('Job description is required'),
  location: Yup.string().required('Location is required'),
  salary: Yup.number().required('Salary is required').min(1000, 'Salary must be at least 1000'),
});

const JobPostingForm: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { title: string; description: string; location: string; salary: number }) => {
    try {
      await axios.post(
        '/api/jobs',
        values,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      alert('Job posted successfully');
    } catch (err) {
      console.error('Error posting job', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <Formik
        initialValues={{ title: '', description: '', location: '', salary: 0 }}
        validationSchema={JobSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label>Job Title</label>
              <Field type="text" name="title" className="input-field" />
              <ErrorMessage name="title" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Job Description</label>
              <Field type="text" name="description" className="input-field" />
              <ErrorMessage name="description" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Location</label>
              <Field type="text" name="location" className="input-field" />
              <ErrorMessage name="location" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Salary</label>
              <Field type="number" name="salary" className="input-field" />
              <ErrorMessage name="salary" component="div" className="text-red-600" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              Post Job
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobPostingForm;
