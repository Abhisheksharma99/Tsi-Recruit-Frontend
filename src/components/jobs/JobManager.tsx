import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';
import { Navigate } from 'react-router-dom';

interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
}

const JobManager: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const auth = useAppSelector((state) => state.auth);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`/api/jobs/${id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                setJobs(jobs.filter((job) => job._id !== id));
                alert('Job deleted successfully');
            } catch (err) {
                console.error('Error deleting job', err);
            }
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/api/jobs', {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                setJobs(res.data);
            } catch (err) {
                console.error('Error fetching jobs', err);
            }
        };
        fetchJobs();
    }, [auth.token]);

    if (auth.user?.role !== 'Recruiter') {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Job Management</h2>
            <div className="mb-4">
                <button className="btn-primary">Create New Job</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id}>
                                <td className="border px-4 py-2">{job.title}</td>
                                <td className="border px-4 py-2">{job.location}</td>
                                <td className="border px-4 py-2">${job.salary}</td>
                                <td className="border px-4 py-2">
                                    <button className="btn-secondary mr-2">Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(job._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobManager;
