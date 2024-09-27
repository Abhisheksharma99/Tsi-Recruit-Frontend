import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const JobEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job', err);
      }
    };

    fetchJob();
  }, [id, auth.token]);

  const handleSubmit = async (values: { title: string; description: string; location: string; salary: number }) => {
    try {
      await axios.put(`/api/jobs/${id}`, values, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      alert('Job updated successfully');
      navigate('/jobs');
    } catch (err) {
      console.error('Error updating job', err);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <Formik
        initialValues={job}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Job title is required'),
          description: Yup.string().required('Job description is required'),
          location: Yup.string().required('Location is required'),
          salary: Yup.number().required('Salary is required').min(1000, 'Salary must be at least 1000'),
        })}
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
              Update Job
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobEditForm;
