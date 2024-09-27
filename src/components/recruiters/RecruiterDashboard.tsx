import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';

interface Job {
  _id: string;
  title: string;
  applications: number;
}

const RecruiterDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/recruiter/jobs', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs', err);
      }
    };

    fetchJobs();
  }, [auth.token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recruiter Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Applications</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.applications}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
