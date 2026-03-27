import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UpgradePage } from "./pages/UpgradePage";
import { UpgradeSuccessPage } from "./pages/UpgradeSuccessPage";
import { ChildDetailPage } from "./pages/ChildDetailPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminRolesPage } from "./pages/admin/AdminRolesPage";
import { SupportPage } from "./pages/SupportPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/upgrade",
    element: <UpgradePage />,
  },
  {
    path: "/upgrade-success",
    element: <UpgradeSuccessPage />,
  },
  {
    path: "/children/:id",
    element: <ChildDetailPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <AdminUsersPage />,
  },
  {
    path: "/admin/roles",
    element: <AdminRolesPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);