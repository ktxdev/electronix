import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import UsersPage from "./pages/admin/UsersPage";
import AdminPageLayout from "./pages/admin/AdminPageLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfileSettingsPage from "./pages/admin/ProfileSettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPageLayout />}>
          <Route index element={<DashboardPage />}/>
          <Route path="users" element={<UsersPage />} />
          <Route path="profile" element={<ProfileSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
