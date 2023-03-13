import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useSessionUser } from "./store/userStore";


function App() {
  const user = useSessionUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
