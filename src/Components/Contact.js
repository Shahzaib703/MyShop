import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, child, push, get } from "firebase/database";
import { useParams } from "react-router-dom";
import SmallProductView from "./SmallProductView";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const naviagtion = useNavigate();
  const [name, setName] = useState("");
  const [Eamil, setEamil] = useState("");
  const [massage, setmassage] = useState("");
  const [state, setFrom] = useState("Pakistan");
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

    if (name === "" || Eamil === "" || massage === "" || state === "") {
      alert("Please fill all the fields...");
      return;
    }

    if (!Eamil.includes("@")) {
      alert("Invalid Email...");
      return;
    }

    let FullName = name;
    let eamil = Eamil;
    let Msg = massage;
    let Country = state;

    let db = getDatabase();
    // Get a key for a new Msg.
    const id = push(child(ref(db), "/Massages")).key;
    const date = new Date().toLocaleString() + "";
    set(ref(db, "Massages/" + id), {
      ProductId: PRODUCT_ID,
      FullName,
      eamil,
      Msg,
      Country,
      date
    });

    naviagtion(`/MyShop/ProductDetail/${PRODUCT_ID}`);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", padding: "10px" }}>
        Contact The Saler
      </h2>

      <div class="container Contectcontainer">
        <SmallProductView data={ProductData} />

        <form onSubmit={Submit} style={{ textAlign: "left" }}>
          <label for="name">First Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your name.."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <label for="Eamil">Eamil Adress</label>
          <input
            value={Eamil}
            type="text"
            name="Eamil"
            placeholder="Your Eamil Adress..."
            onChange={(e) => {
              setEamil(e.target.value);
            }}
          />

          <label for="country">Country</label>
          <select
            id="country"
            name="country"
            onChange={(e) => {
              setFrom(e.target.value);
            }}
          >
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Afganistan">Afganistan</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>

          <label for="subject">Subject</label>
          <textarea
            id="subject"
            value={massage}
            name="subject"
            onChange={(e) => {
              setmassage(e.target.value);
            }}
            placeholder="Write something.."
            style={{ height: "200px" }}
          ></textarea>

          <input
            className="btn btn-outline-warning"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
};

export default Contact;
