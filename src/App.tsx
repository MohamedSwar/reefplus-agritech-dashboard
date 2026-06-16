import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Investment from './pages/Investment';
import Support from './pages/Support';
import Farms from './pages/Farms';
import Sensors from './pages/Sensors';
import Devices from './pages/Devices';
import TestPage from './pages/TestPage';
import AuthPage from './components/Auth/AuthPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Loading component
const AppLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <p className="mt-4 text-gray-600">جاري تحميل التطبيق...</p>
      <p className="text-sm text-gray-400 mt-2">يرجى الانتظار</p>
    </div>
  </div>
);

// Main app content
const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test-public" element={<TestPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/farms" element={
          <ProtectedRoute>
            <Layout>
              <Farms />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/sensors" element={
          <ProtectedRoute>
            <Layout>
              <Sensors />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <Layout>
              <Devices />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/test" element={
          <ProtectedRoute>
            <Layout>
              <TestPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/marketplace" element={
          <ProtectedRoute>
            <Layout>
              <Marketplace />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/investment" element={
          <ProtectedRoute>
            <Layout>
              <Investment />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <Layout>
              <Support />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/map" element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12 text-gray-500">خريطة المزارع والموردين - قريباً</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/stores" element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12 text-gray-500">متاجر المستلزمات الزراعية - قريباً</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12 text-gray-500">الإشعارات - قريباً</div>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12 text-gray-500">لوحة الإدارة - قريباً</div>
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Catch-all route - redirect to auth if not found */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;