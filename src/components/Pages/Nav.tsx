import { useEffect, useState } from "react";
import logo from "../../assets/white_logo.svg"
const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          

          Wissen<span>Hub</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Our Teachers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Contact
              </a>
            </li>
          </ul>
          <button
            id="dark-mode-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <span>{darkMode ? "🌜" : "🌞"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
