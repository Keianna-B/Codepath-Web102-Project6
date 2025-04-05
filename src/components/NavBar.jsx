function NavBar() {
  return (
    <div className="Nav">
      <h1>DashBoard</h1>
      <hr />
      <li className="selected">
        <a href="#home">Dashboard</a>
      </li>
      <li>
        <a href="#news">Search</a>
      </li>
      <li>
        <a href="#contact">About</a>
      </li>
    </div>
  );
}

export default NavBar;