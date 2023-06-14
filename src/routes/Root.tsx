import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" />
    </>
  );
}
