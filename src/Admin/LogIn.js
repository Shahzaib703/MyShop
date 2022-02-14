import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const LogIn = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
      return;
    }

    setData({ ...data, error: null, loading: true });

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <section>
      <h3>Log In</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn btn-dark mt-5" disabled={loading}>
            {loading ? "Singing In ..." : "Sing In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LogIn;
