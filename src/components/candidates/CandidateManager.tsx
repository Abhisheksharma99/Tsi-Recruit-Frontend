import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';
import { Navigate } from 'react-router-dom';

interface Candidate {
  _id: string;
  name: string;
  email: string;
  status: string;
}

const CandidateManager: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get('/api/candidates', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setCandidates(res.data);
      } catch (err) {
        console.error('Error fetching candidates', err);
      }
    };
    fetchCandidates();
  }, [auth.token]);

  if (auth.user?.role !== 'Recruiter') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Candidate Management</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.email}</td>
                <td className="border px-4 py-2">{candidate.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateManager;
