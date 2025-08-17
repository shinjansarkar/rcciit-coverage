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
import AdminGuard from "@/context/AdminGuard";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="events/:periodId" element={<EventsList />} />
        <Route path="event/:eventId" element={<EventDetail />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      }>
        <Route index element={<Dashboard />} />
        <Route path="periods" element={<ManagePeriods />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="links" element={<ManageLinks />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;