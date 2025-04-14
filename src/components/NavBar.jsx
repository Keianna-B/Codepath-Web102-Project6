import '/src/App.css'
import { useNavigate } from "react-router-dom";


function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <h1>Amiibo DashBoard</h1>
      <hr />
      <div className="nav-bar">
        <a  className="nav-button" onClick={() => navigate("/")}>Dashboard</a>
        <a  className="nav-button" onClick={() => navigate("/")}>Search</a>
        <a  className="nav-button" onClick={() => navigate("/")}>About</a>
      </div>
    </div>
  );
}

export default NavBar;