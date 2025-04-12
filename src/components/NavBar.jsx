import '/src/App.css'


function NavBar() {
  return (
    <div className="nav">
      <h1>Amiibo DashBoard</h1>
      <hr />
      <div className="nav-bar">
      <li className="selected">
          <a href="#whole-page" >Dashboard</a>
        </li>
        <li>
          <a href="#search-bar">Search</a>
        </li>
        <li>
          <a href="#amiibo-table">Table</a>
        </li>
      </div>
    </div>
  );
}

export default NavBar;