import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import {
  getDatabase,
  child,
  ref as realRef,
  set,
  push,
  get,
} from "firebase/database";
import { useNavigate } from "react-router-dom";

const AddorEDIT_Product = (prpos) => {
  const inputFileRef = React.useRef();
  const [Image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fimages.jpg?alt=media&token=045dc65b-dc44-43d2-bd65-f91a97ef79a7"
  );
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [Time, setTime] = useState("2 to 3 Days");
  const [Description, setDescription] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [Uploading, setUploading] = useState(false);
  const [productKey, setproductKey] = useState("");
  const db = getDatabase();

  const { PRODUCT_ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (PRODUCT_ID) {
      setisProcessing(true);
      setproductKey(PRODUCT_ID);

      const dbRef = realRef(getDatabase());
      get(child(dbRef, `/AllProducts/${PRODUCT_ID}`))
        .then((snapshot) => {
          setisProcessing(false);
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
          setisProcessing(false);
          console.error(error);
        });
    } else {
      // Get a key for a new Msg.
      const ProductId = push(child(realRef(db), "/AllProducts")).key;
      setproductKey(ProductId);
    }
  }, [PRODUCT_ID]);

  const PublishProduct = async () => {
    if (!Title || !Price || !Time || !Image || !Description) {
      alert("Invalid Data...!");
      return;
    }

    setUploading(true);

    const data = {
      title: Title,
      price: Price,
      time: Time,
      image: Image,
      decription: Description,
    };

    const reference = realRef(db, `/AllProducts/${productKey}`);

    set(reference, data).then(() => {
      navigate("/MyShop/Shahzaib/Admin/AdminPenal");
      setUploading(false);
    });
  };

  const onFileChangeCapture = (e) => {
    setisProcessing(true);
    const id = makeid("10");

    try {
      const storageRef = ref(getStorage(), `ProductsImg/${id}.png`);
      uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setImage(downloadURL);
          setisProcessing(false);
        });
      });
    } catch (err) {
      setisProcessing(false);
      console.log("ERROR: " + err);
    }
  };
  function SelectImage() {
    inputFileRef.current.click();
  }

  return (
    <div className=" container AddForm">
      <form>
        <div className="form-group" style={{ display: "flex" }}>
          <div className="ProductAddImage" onClick={SelectImage}>
            <img src={Image} alt="Avatar" class="image" />
            <div className="overlay">
              <div className="ImageUploadText">Upload Image</div>
            </div>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={inputFileRef}
            onChangeCapture={onFileChangeCapture}
          />
          <div className="container">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Product Name"
              value={Title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <select
              value={Time}
              className="form-control mt-2"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              <option value="2 to 3 Days">2 to 3 Days</option>
              <option value="3 to 5 Days">3 to 5 Days</option>
              <option value="5 to 10 Days">5 to 10 Days</option>
              <option value="10 to 20 Days">10 to 20 Days</option>
            </select>
            <input
              style={{ maxWidth: "150px" }}
              type="text"
              className="form-control mt-2"
              id="exampleFormControlInput1"
              placeholder="Price"
              maxLength={10}
              value={Price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="Description"
            placeholder="Description For The Product:"
            value={Description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        {Uploading ? (
          <button type="button" className="btn btn-warning">
            Publishing...
          </button>
        ) : isProcessing ? (
          <button type="button" className="btn btn-warning">
            Processing...
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-warning"
            onClick={PublishProduct}
          >
            Publish
          </button>
        )}
      </form>
    </div>
  );
};
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default AddorEDIT_Product;
