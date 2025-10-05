import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import Home from "@/pages/public/Home";
import EventsList from "@/pages/public/EventsList";
import EventDetail from "@/pages/public/EventDetail";
import Dashboard from "@/pages/admin/Dashboard";
import ManagePeriods from "@/pages/admin/ManagePeriods";
import ManageEvents from "@/pages/admin/ManageEvents";
import ManageLinks from "@/pages/admin/ManageLinks";
import Login from "@/pages/auth/Login";
import Logout from "@/pages/auth/Logout";
import Signup from "@/pages/auth/Signup";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import TestUI from "@/pages/TestUI";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Public & Auth Routes (remain the same) --- */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="events/:periodId" element={<EventsList />} />
        <Route path="event/:eventId" element={<EventDetail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />

      {/* --- Cleaner Admin Routes Structure --- */}
      <Route 
        element={
          <ProtectedRoute requireAdmin={true} />
        }
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="periods" element={<ManagePeriods />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="links" element={<ManageLinks />} />
        </Route>
      </Route>

      {/* --- Other routes --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;