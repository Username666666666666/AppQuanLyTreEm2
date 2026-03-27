import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { getCurrentUser } from "../lib/auth"; // Phước nhớ sửa đúng đường dẫn tới file chứa hàm này nhé

export function AuthGuard({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}