import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

// Validation schema
const ApplicationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  coverLetter: Yup.string().required('Cover letter is required'),
  resume: Yup.mixed().required('Resume is required'),
});

const CandidateApplicationForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const auth = useAppSelector((state) => state.auth);
  const { jobId } = useParams<{ jobId: string }>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const handleSubmit = async (values: { name: string; email: string; coverLetter: string }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('coverLetter', values.coverLetter);
    if (file) {
      formData.append('resume', file);
    }

    try {
      await axios.post(`/api/jobs/${jobId}/apply`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully');
    } catch (err) {
      console.error('Error submitting application', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      <Formik
        initialValues={{ name: '', email: '', coverLetter: '' }}
        validationSchema={ApplicationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label>Name</label>
              <Field type="text" name="name" className="input-field" />
              <ErrorMessage name="name" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Email</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Cover Letter</label>
              <Field as="textarea" name="coverLetter" className="input-field" />
              <ErrorMessage name="coverLetter" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label>Resume</label>
              <input type="file" name="resume" onChange={handleFileChange} className="input-field" />
              <ErrorMessage name="resume" component="div" className="text-red-600" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              Submit Application
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CandidateApplicationForm;
