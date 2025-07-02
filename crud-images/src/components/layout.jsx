// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import logo from "../assets/logo-dedc-sm-dark.svg";

export function Navbar() {
  const { currentUser, logout } = useAuth();
  console.log("Navbar user:", currentUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="..." width="30" className="me-2" />
          La Boutik à Klaps
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item text-dark">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul className="dropdown-menu">
                {!currentUser && (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Se connecter
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                        style={{
                          cursor: "pointer",
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                      >
                        Se décoonecter
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className="text-center p-4 border-top">
      <img src={logo} alt="..." width="30" className="me-2" /> La Boutik à Klaps
    </div>
  );
}
