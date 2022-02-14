import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, set, push } from "firebase/database";
import { useParams } from "react-router-dom";
import SmallProductView from "./SmallProductView";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const naviagtion = useNavigate();
  const [Fullname, setname] = useState("");
  const [Eamil, setEamil] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Count, setCount] = useState(1);
  const { PRODUCT_ID } = useParams();

  const [ProductData, setProductData] = useState({
    Image:
      "https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fimages.jpg?alt=media&token=045dc65b-dc44-43d2-bd65-f91a97ef79a7",
    Title: "",
    Price: "",
    Time: "2 to 3 Days",
    Description: "",
  });

  useEffect(() => {
    get(child(ref(getDatabase()), `/AllProducts/${PRODUCT_ID}`))
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

  const Submit = async (e) => {
    e.preventDefault();

    if (Fullname === "" || Eamil === "" || PhoneNumber === "" || Count === "") {
      alert("Please fill all the fields...");
      return;
    }

    if (!Eamil.includes("@")) {
      alert("Invalid Email...");
      return;
    }

    if (!PhoneNumber.includes("+")) {
      alert("Invalid PhoneNumber...");
      return;
    }

    if (Count <= 0) {
      alert("Invalid Product Counting...");
      return;
    }

    let FirstName = Fullname;
    let eamil = Eamil;
    let phoneNumber = PhoneNumber;
    let Quantity = Count;
    let TotalPrice = Count * ProductData.Price;
    const date = new Date().toLocaleString() + "";
    
    let db = getDatabase();
    // Get a key for a new Msg.
    const id = push(child(ref(db), "/Orders")).key;

    await set(ref(db, "Orders/" + id), {
      ProductId: PRODUCT_ID,
      FirstName,
      eamil,
      phoneNumber,
      Quantity,
      TotalPrice,
      date
    });

    naviagtion(`/MyShop/ProductDetail/${PRODUCT_ID}`);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", padding: "10px" }}>Place An Order</h2>

      <div className="container Contectcontainer">
        <SmallProductView data={ProductData} />

        <form onSubmit={Submit} style={{ textAlign: "left" }}>
          <label>First Name</label>
          <input
            type="text"
            name="Fullname"
            value={Fullname}
            placeholder="Your Full name.."
            onChange={(e) => {
              setname(e.target.value);
            }}
          />

          <label>Eamil Adress</label>
          <input
            value={Eamil}
            type="text"
            name="Eamil"
            placeholder="Your Eamil Adress..."
            onChange={(e) => {
              setEamil(e.target.value);
            }}
          />

          <label>Contact Number:</label>
          <input
            type="text"
            name="Fullname"
            value={PhoneNumber}
            placeholder="+92XXXXXXXXX"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              value={Count}
              type="number"
              name="Eamil"
              placeholder="Your Eamil Adress..."
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
            <h5>Total Price:{Count * ProductData.Price} </h5>
          </div>
          <input
            className="btn btn-outline-warning"
            type="submit"
            style={{ marginTop: "10px" }}
            value="Submit"
          />
        </form>
      </div>
    </>
  );
};

export default Order;
