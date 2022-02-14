import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <h3>
        <Link
          className="navbar-brand"
          to="/MyShop"
          style={{ color: "#ffc107" }}
        >
          My Store <span className="sr-only">(current)</span>
        </Link>
      </h3>
      <div style={{ display: "flex" }}>
        <p
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            color: "white",
          }}
        >
          <Link className="nav-link" to="/MyShop">
            Home <span className="sr-only">(current)</span>
          </Link>
        </p>
        <p
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            color: "white",
          }}
        >
          <Link className="nav-link" to="/MyShop/About">
            About <span className="sr-only">(current)</span>
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
