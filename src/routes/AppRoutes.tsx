import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import { PrivateRoute } from "./PrivateRoute";
import { Dashboard } from "../pages/Dashboard";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const AppRoutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Header
                  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
                <main className="pt-16 lg:pl-64">
                  <div className="container mx-auto p-4">
                    <Dashboard />
                  </div>
                </main>
              </div>
            </PrivateRoute>
          }
        />
        {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
