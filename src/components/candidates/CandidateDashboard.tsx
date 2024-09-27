import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';

interface Application {
  _id: string;
  jobTitle: string;
  status: string;
}

const CandidateDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/api/candidates/applications', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Error fetching applications', err);
      }
    };

    fetchApplications();
  }, [auth.token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border px-4 py-2">{application.jobTitle}</td>
                <td className="border px-4 py-2">
                  {application.status === 'Accepted' ? (
                    <span className="text-green-600">Accepted</span>
                  ) : application.status === 'Rejected' ? (
                    <span className="text-red-600">Rejected</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateDashboard;
