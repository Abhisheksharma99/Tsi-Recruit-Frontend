import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface Application {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  status: string;
  coverLetter: string;
}

const ApplicationReview: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/jobs/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Error fetching applications', err);
      }
    };

    fetchApplications();
  }, [jobId, auth.token]);

  const updateStatus = async (appId: string, status: string) => {
    try {
      await axios.put(`/api/jobs/${jobId}/applications/${appId}/status`, { status }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setApplications(applications.map((app) => (app._id === appId ? { ...app, status } : app)));
    } catch (err) {
      console.error('Error updating status', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Application Review</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Candidate Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Cover Letter</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border px-4 py-2">{application.candidateName}</td>
                <td className="border px-4 py-2">{application.candidateEmail}</td>
                <td className="border px-4 py-2">{application.coverLetter}</td>
                <td className="border px-4 py-2">{application.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="btn-primary mr-2"
                    onClick={() => updateStatus(application._id, 'Accepted')}
                  >
                    Accept
                  </button>
                  <button className="btn-danger" onClick={() => updateStatus(application._id, 'Rejected')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationReview;
