import React, { useEffect } from "react";
import { get, ref, getDatabase, child } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setAllProducts } from "../Store/Action/Actions";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

const Home = () => {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.AllProducts);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("https://api.jikan.moe/v3/search/anime?q=naruto");
    //     const json = await response.json();
    //     console.log(json.results);

    //     json.results.map((product) => {
    //       const ProductId = push(child(ref(getDatabase()), "/AllProducts")).key;

    //       const data = {
    //         title: product.title,
    //         price: product.score,
    //         time: "2 to 5 Days",
    //         image: product.image_url,
    //         decription: product.synopsis,
    //       };

    //       const reference = ref(getDatabase(), `/AllProducts/${ProductId}`);

    //       set(reference, data);
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    // fetchData();

    // APIs
    // https://api.jikan.moe/v3/search/anime?q=naruto
    // const data = {
    //   title: product.title,
    //   price: product.score,
    //   time: "2 to 5 Days",
    //   image: product.image_url,
    //   decription: product.synopsis,
    // };

    // https://fakestoreapi.com/products
    // const data = {
    //   title: product.title,
    //   price: product.price,
    //   time: "5 to 10 Days",
    //   image: product.image,
    //   decription: product.description,
    // };

    // http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline
    // const data = {
    //   title: product.name,
    //   price: product.price,
    //   time: "10 to 20 Days",
    //   image: product.image_link,
    //   decription: product.description,
    // };

    get(child(ref(getDatabase()), "AllProducts/")).then((snapshot) => {
      snapshot.forEach((snap) => {
        dispatch(addProduct({ ...snap.val(), key: snap.key }));
      });
    });
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Carousel />

        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            width: "95%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {AllProducts.map((product, index) => {
            return <Card key={index} data={product} />;
          })}
        </div>
      </div>
    </>
  );
};

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
      style={{ maxHeight: "70vh" }}
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fsale.jpg?alt=media&token=a78c1b75-1011-4b88-8af5-d45ab5891643"
            alt="First slide"
            style={{ maxHeight: "70vh" }}
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fonline-shopping-banner-vector-17230980.jpg?alt=media&token=d566a401-27f9-4c72-b78c-91f5ddc362d3"
            alt="Second slide"
            style={{ maxHeight: "70vh" }}
          />
          <div class="carousel-caption d-none d-md-block">
            <h5 style={{ color: "black" }}>
              {" "}
              <b> Online Shoping </b>
            </h5>
            <p style={{ color: "black" }}>
              <b>
                We Are Hare To Provide The Best Clothing For Your And Your
                Stars.
              </b>
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fmy_potfolio_img.PNG?alt=media&token=b0901e83-57c7-4bd2-b172-932bb678feb8"
            alt="Third slide"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
};

const Card = (props) => {
  const navigation = useNavigate();
  const { decription, image, price, time, title, key } = props.data;

  return (
    <div
      className="card"
      style={{
        textAlign: "left",
        width: "17rem",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
      }}
    >
      <div
        className="ProductAddImage"
        style={{ width: "100%" }}
        onClick={() => {
          navigation(`/MyShop/ProductDetail/${key}`);
        }}
      >
        <img
          src={image}
          className="card-img-top"
          style={{ borderBottom: "1px solid #ffc107", maxHeight: "350px" }}
          alt="image"
        />
        <div className="overlay">
          <div className="ImageUploadText">Explore</div>
        </div>
      </div>

      <div style={{ padding: "10px" }}>
        <p>
          <b style={{ color: "#ffc107" }}>Name:</b>
          {title}
        </p>
        <p>
          <b style={{ color: "#ffc107" }}>Price:</b>
          {price} USD
        </p>
        <p>
          <b style={{ color: "#ffc107" }}>Delivery in:</b> {time}
        </p>
        <p style={{ marginBottom: "30px" }}>
          <b style={{ color: "#ffc107" }}>Decription:</b>
          {decription.length > 250
            ? decription.substring(0, 150) + "..."
            : decription}
        </p>
        <button
          type="button"
          class="btn btn-warning"
          style={{
            margin: "5px",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
          onClick={() => {
            navigation(`/MyShop/ProductDetail/${key}`);
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Home;
