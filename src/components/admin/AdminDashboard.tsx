import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { useAppSelector } from '../../hooks/redux';

interface Stats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching admin stats', err);
      }
    };

    fetchStats();
  }, [auth.token]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p>{stats.totalJobs}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
