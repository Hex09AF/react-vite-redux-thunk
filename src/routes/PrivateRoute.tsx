import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Nav from "../components/Nav";

export default function PrivateRoute() {
  const auth = useAuth();
  const location = useLocation();

  return (
    <>
      {auth.user ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
}
