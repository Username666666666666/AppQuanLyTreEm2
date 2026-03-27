import { createBrowserRouter, Navigate } from "react-router";
import { AuthGuard } from "./components/AuthGuard"; 
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
import { AuthCallbackPage } from "./pages/AuthCallbackPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  
  // Các trang yêu cầu User thường
  { path: "/", element: <AuthGuard><DashboardPage /></AuthGuard> },
  { path: "/upgrade", element: <AuthGuard><UpgradePage /></AuthGuard> },
  { path: "/upgrade-success", element: <AuthGuard><UpgradeSuccessPage /></AuthGuard> },
  { path: "/children/:id", element: <AuthGuard><ChildDetailPage /></AuthGuard> },
  { path: "/support", element: <AuthGuard><SupportPage /></AuthGuard> },

  // Các trang yêu cầu Admin
  { path: "/admin", element: <AuthGuard adminOnly><AdminDashboard /></AuthGuard> },
  { path: "/admin/users", element: <AuthGuard adminOnly><AdminUsersPage /></AuthGuard> },
  { path: "/admin/roles", element: <AuthGuard adminOnly><AdminRolesPage /></AuthGuard> },

 { path: "/login", element: <LoginPage /> },
  // ... các trang khác giữ nguyên ...

 {
  path: "/auth/callback",
  element: <AuthCallbackPage />,
},
  // LUÔN ĐỂ CÁI NÀY Ở DƯỚI CÙNG
  { path: "*", element: <NotFoundPage /> },
]);