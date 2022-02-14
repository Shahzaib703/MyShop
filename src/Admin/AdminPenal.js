import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../Store/Action/Actions";

const AdminPenal = () => {
  return (
    <div className="AdminPenal">
      <AllProducts />
      <AddBtn />
    </div>
  );
};

const AllProducts = () => {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.AllProducts);

  useEffect(() => {
    get(child(ref(getDatabase()), "AllProducts/")).then((snapshot) => {
      let array = [];
      snapshot.forEach((snap) => {
        array.push({ ...snap.val(), key: snap.key });
      });
      dispatch(setAllProducts(array));
    });
  }, []);

  return (
    <div>
      <h4>All Products</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Time</th>
            <th scope="col">Decription</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {AllProducts.map((product, index) => {
            return <ProductCard key={index} data={product} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const ProductCard = ({ data, index }) => {
  const Nav = useNavigate();

  const { decription, image, key, price, time, title } = data;

  const DeleteProduct = (PRODUCT_ID) => {
    remove(ref(getDatabase(), `/AllProducts/${PRODUCT_ID}`));
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <img
          style={{ height: "80px", width: "100px", border: "1px solid white" }}
          src={image}
          alt="Image"
        />
      </td>
      <td>{title.length > 20 ? `${title.substring(0, 20) + "..."}` : title}</td>
      <td>{price}</td>
      <td>{time}</td>
      <td>
        {decription.length > 20
          ? `${decription.substring(0, 20) + "..."}`
          : decription}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            Nav(`/MyShop/Shahzaib/Admin/AdminPenal/Edit/Product/${key}`);
          }}
        >
          Edit
        </button>
        <button
          style={{ marginLeft: "5px" }}
          type="button"
          className="btn btn-dark"
          onClick={() => DeleteProduct(key)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

const AddBtn = () => {
  const Nav = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-dark addBtn"
      onClick={() => {
        Nav("/MyShop/Shahzaib/Admin/AdminPenal/AddProduct");
      }}
    >
      Add
    </button>
  );
};

export default AdminPenal;
