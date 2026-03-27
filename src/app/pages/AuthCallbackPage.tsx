import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";
import { syncUserFromSupabase } from "../lib/auth";

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        syncUserFromSupabase(data.session.user);
        navigate("/");
      } else {
        navigate("/login");
      }
    };

    handle();
  }, []);

  return <div>Đang đăng nhập...</div>;
}