import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import About from "./Components/About";
import AdminPenal from "./Admin/AdminPenal";
import AddorEDIT_Product from "./Admin/AddorEDIT_Product";
import { AuthContext } from "./Context/Auth";
import { useContext } from "react";
import LogIn from "./Admin/LogIn";
import NavBarAdmin from "./Admin/NavBarAdmin";
import ProductDetails from "./Components/ProductDetails";
import Contact from "./Components/Contact";
import Order from "./Components/Order";
import AdminOrders from "./Admin/AdminOrders";
import AdminMassages from "./Admin/AdminMassages";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/MyShop"
            element={
              <div>
                <Outlet />
              </div>
            }
          >
            <Route
              index
              element={
                <>
                  <NavBar />
                  <Home />
                </>
              }
            />
            <Route
              path="About"
              element={
                <>
                  <NavBar />
                  <About />
                </>
              }
            />

            <Route
              path="Contact/:PRODUCT_ID"
              element={
                <>
                  <NavBar />
                  <Contact />
                </>
              }
            />
            <Route
              path="Order/:PRODUCT_ID"
              element={
                <>
                  <NavBar />
                  <Order />
                </>
              }
            />
            <Route
              path="ProductDetail/:PRODUCT_ID"
              element={
                <>
                  <NavBar />
                  <ProductDetails />
                </>
              }
            />
            <Route
              path="Shahzaib/Admin/AdminPenal"
              element={
                <div>
                  <Outlet />
                </div>
              }
            >
              <Route
                index
                element={
                  <>
                    <NavBarAdmin />
                    {user ? <AdminPenal /> : <LogIn />}
                  </>
                }
              />

              <Route
                path="Orders"
                element={
                  <>
                    <NavBarAdmin />
                    {user ? <AdminOrders /> : <LogIn />}
                  </>
                }
              />
              <Route
                path="Massages"
                element={
                  <>
                    <NavBarAdmin />
                    {user ? <AdminMassages /> : <LogIn />}
                  </>
                }
              />
              <Route
                path="AddProduct"
                element={
                  <>
                    <NavBarAdmin />
                    {user ? <AddorEDIT_Product /> : <LogIn />}
                  </>
                }
              />
              <Route
                path="Edit/Product/:PRODUCT_ID"
                element={
                  <>
                    <NavBarAdmin />
                    {user ? <AddorEDIT_Product /> : <LogIn />}
                  </>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
