import Container from "../../Container";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user);
      setUser(user);
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    return navigate("/");
  }
  return (
    <div className="navbar">
      <Container>
        <div className="navbar-frame">
          <h1 className="navbar-logo">Solar Farms</h1>
          {user && (
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
