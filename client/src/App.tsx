import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionUser } from "./store/userStore";

function App() {
  const user = useSessionUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="b">
      <h2>login</h2>
    </div>
  );
}

export default App;
