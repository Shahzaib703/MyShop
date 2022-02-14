import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { AuthContext } from "../Context/Auth";

const NavBarAdmin = () => {
  const { user } = useContext(AuthContext);

  const singOut = (e) => {
    e.preventDefault();
    try {
      auth.signOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <nav>
      <h3>
        <Link className="navbar-brand" to="/MyShop/Shahzaib/Admin/AdminPenal">
          My Store <span className="sr-only">(current)</span>
        </Link>
      </h3>
      <div style={{ display: "flex" }}>
        {user ? (
          <>
            <p
              style={{
                marginBottom: "auto",
                marginTop: "auto",
                color: "white",
              }}
            >
              <Link className="nav-link" to="/MyShop/Shahzaib/Admin/AdminPenal">
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
              <Link
                className="nav-link"
                to="/MyShop/Shahzaib/Admin/AdminPenal/Massages"
              >
                Massages <span className="sr-only">(current)</span>
              </Link>
            </p>
            <p
              style={{
                marginBottom: "auto",
                marginTop: "auto",
                color: "white",
              }}
            >
              <Link
                className="nav-link"
                to="/MyShop/Shahzaib/Admin/AdminPenal/Orders"
              >
                Orders <span className="sr-only">(current)</span>
              </Link>
            </p>

            <button type="button" className="btn btn-dark" onClick={singOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h5 style={{ color: "white" }}>You Need To LogIn</h5>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBarAdmin;
