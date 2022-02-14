import React, { useEffect, useState } from "react";
import {
  getDatabase,
  get,
  child,
  ref,
  remove,
  off,
  onChildAdded,
  onChildRemoved,
} from "firebase/database";

import { AddOrder, RemoveOrder,RemoveAllOrder } from "../Store/Action/Actions";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const AllOrders = useSelector((state) => state.AllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    onChildAdded(ref(getDatabase(), `/Orders`), (snap) => {
      dispatch(AddOrder({ ...snap.val(), key: snap.key }));
    });
    onChildRemoved(ref(getDatabase(), `/Orders`), (snap) => {
      dispatch(RemoveOrder({ ...snap.val(), key: snap.key }));
    });

    return () => {
      off(ref(getDatabase(), `/Orders`));
      dispatch(RemoveAllOrder(null));
    };
  }, []);

  const DeleteOrder = (key) => {
    remove(ref(getDatabase(), `/Orders/${key}`));
  };

  return (
    <div>
      <h4>All Orders</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Customer</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Totol Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {AllOrders.map((Order, index) => {
            return (
              <OrdersRow
                key={index}
                data={Order}
                index={index}
                DeleteOrder={DeleteOrder}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const OrdersRow = ({ data, index, DeleteOrder }) => {
  console.log(data);
  const {
    FirstName,
    ProductId,
    Quantity,
    TotalPrice,
    eamil,
    key,
    phoneNumber,
    date,
  } = data;

  const [ProductData, setProductData] = useState({});
  const { Title, Image } = ProductData;

  useEffect(() => {
    get(child(ref(getDatabase()), `/AllProducts/${ProductId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProductData({
            Image: snapshot.val().image,
            Title: snapshot.val().title,
            Price: snapshot.val().price,
            Time: snapshot.val().time,
            Description: snapshot.val().decription,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <div>
            <img
              style={{
                height: "80px",
                width: "100px",
                border: "1px solid white",
              }}
              src={Image}
              alt="Image"
            />
            <div>{Title}</div>
          </div>
        </td>

        <td>{FirstName}</td>
        <td>{phoneNumber}</td>
        <td style={{ color: "#ffc107" }}>{eamil}</td>
        <td>{date}</td>
        <td style={{ maxWidth: "250px" }}>{Quantity}</td>

        <td>{TotalPrice}</td>

        <td>
          <button
            style={{ marginLeft: "5px" }}
            type="button"
            className="btn btn-dark"
            onClick={() => DeleteOrder(key)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default AdminOrders;
