import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Chặn render phía Server để tránh lệch DOM

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}