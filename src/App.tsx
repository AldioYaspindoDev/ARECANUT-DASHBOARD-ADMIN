import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Autentikasi/login';
import Blogs from './pages/Blog/Blog';
import DetailBlogs from './pages/Homepages/DetailBlogs';

// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Products from './pages/Products/Products';
import History from './pages/History/History';
import Prices from './pages/Prices/Prices';
import Settings from './pages/Settings/Settings';
import Scanner from './pages/Scanner/Scanner';
import HomePage from './pages/Homepages/HomePage';
import ScannerPublic from './pages/ScanPublic/ScanPublic';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<DetailBlogs />} />
        <Route path="/scan" element={<ScannerPublic />} />
        {/* Protected Admin Dashboard and Sub-pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/pinang-data" element={<Products />} />
                  <Route path="/scanner" element={<Scanner />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/articles" element={<Blogs />} />
                  <Route path="/prices" element={<Prices />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
