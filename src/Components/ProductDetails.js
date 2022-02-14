import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get, child, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [Image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fimages.jpg?alt=media&token=045dc65b-dc44-43d2-bd65-f91a97ef79a7"
  );
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [Time, setTime] = useState("2 to 3 Days");
  const [Description, setDescription] = useState("");

  const { PRODUCT_ID } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/AllProducts/${PRODUCT_ID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDescription(snapshot.val().decription);
          setTime(snapshot.val().time);
          setPrice(snapshot.val().price);
          setTitle(snapshot.val().title);
          setImage(snapshot.val().image);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="ProductDetailContainer">
      <div>
        <img style={{ width: "350px" }} src={Image} />
      </div>

      <div
        style={{
          padding: "10px",
          textAlign: "left",
          borderLeft: "2px solid black",
          margin: "10px",
        }}
      >
        <p>
          <b style={{ color: "#ffc107" }}>Name:</b>
          {Title}
        </p>
        <p>
          <b style={{ color: "#ffc107" }}>Price:</b>
          {Price}
        </p>
        <p>
          <b style={{ color: "#ffc107" }}>Delivery in:</b> {Time}
        </p>
        <p style={{ marginBottom: "30px" }}>
          <b style={{ color: "#ffc107" }}>Decription:</b>
          {Description}
        </p>
        <div style={{ display: "flex" }}>
          <button
            class="btn btn-outline-dark"
            onClick={() => {
              nav(`/MyShop/Contact/${PRODUCT_ID}`);
            }}
          >
            Contact With Saler
          </button>
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{
              marginLeft: "10px",
              position: "relative",
            }}
            onClick={() => {
              nav(`/MyShop/Order/${PRODUCT_ID}`);
            }}
          >
            Place The Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
