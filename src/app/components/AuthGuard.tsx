import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../lib/auth"; // Phước nhớ sửa đúng đường dẫn tới file chứa hàm này nhé

export function AuthGuard({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else if (adminOnly && currentUser.role !== "admin") {
      navigate("/");
    }
  }, [currentUser, navigate, adminOnly]);

  if (!currentUser || (adminOnly && currentUser.role !== "admin")) return null;

  return <>{children}</>;
}