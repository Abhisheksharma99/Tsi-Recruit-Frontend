import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute'; // Role-based private route

// Lazy loading other components
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminUserManagement = lazy(() => import('./components/admin/AdminUserManagement'));
const RecruiterDashboard = lazy(() => import('./components/recruiters/RecruiterDashboard'));
const CandidateDashboard = lazy(() => import('./components/candidates/CandidateDashboard'));
const ApplicationReview = lazy(() => import('./components/recruiters/ApplicationReview'));
const JobPostingForm = lazy(() => import('./components/jobs/JobPostingForm'));
const JobEditForm = lazy(() => import('./components/jobs/JobEditForm'));
const JobListings = lazy(() => import('./components/jobs/JobListings'));
const CandidateApplicationForm = lazy(() => import('./components/candidates/CandidateApplicationForm'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:jobId/apply" element={<CandidateApplicationForm />} />

            {/* Private Routes with Role-based Access */}
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute allowedRoles={['Admin']} />}
            >
              <Route path="" element={<AdminDashboard />} />
            </Route>

            <Route
              path="/admin/users"
              element={<PrivateRoute allowedRoles={['Admin']} />}
            >
              <Route path="" element={<AdminUserManagement />} />
            </Route>
            <Route
              path="/recruiter/dashboard"
              element={<PrivateRoute allowedRoles={['Recruiter']} />}
            >
              <Route path="" element={<RecruiterDashboard />} />
            </Route>

            <Route
              path="/candidate/dashboard"
              element={<PrivateRoute allowedRoles={['Candidate']} />}
            >
              <Route path="" element={<CandidateDashboard />} />
            </Route>

            <Route
              path="/jobs/:jobId/edit"
              element={<PrivateRoute allowedRoles={['Recruiter']} />}
            >
              <Route path="" element={<JobEditForm />} />
            </Route>

            <Route
              path="/jobs/:jobId/applications"
              element={<PrivateRoute allowedRoles={['Recruiter']} />}
            >
              <Route path="" element={<ApplicationReview />} />
            </Route>

            <Route
              path="/jobs/new"
              element={<PrivateRoute allowedRoles={['Recruiter']} />}
            >
              <Route path="" element={<JobPostingForm />} />
            </Route>

            {/* Add more routes as required */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
