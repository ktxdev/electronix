import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminPageLayout from "./pages/admin/AdminPageLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfileSettingsPage from "./pages/admin/ProfileSettingsPage";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserInfoPage from "./pages/admin/UserInfoPage";
import CategoriesPage from "./pages/admin/CategoriesPage";

function App() {
  return (
    <Router>
      <AlertProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPageLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="categories" element={<CategoriesPage />}/>
              <Route path="users" element={<UsersPage />} />
              <Route path="users/new" element={<UserInfoPage />} />
              <Route path="users/edit/:userId" element={<UserInfoPage />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
