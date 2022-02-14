const SmallProductView = (props) => {
    const { Description, Image, Price, Time, Title } =props.data;
      return (
      <div style={{ display: "flex" }}>
        <div>
          <img src={Image} style={{ width: "130px" }} alt="Image" />
        </div>
        <div
          style={{
            textAlign: "left",
            marginLeft: "10px",
            paddingLeft: "10px",
            borderLeft: "1px solid gray",
          }}
        >
          <p>
            <b style={{ color: "#ffc107", margin: "0px" }}>Name:</b>
            {Title}
          </p>
          <p>
            <b style={{ color: "#ffc107", margin: "0px" }}>Price:</b>
            {Price}
          </p>
          <p>
            <b style={{ color: "#ffc107", margin: "0px" }}>Delivery in:</b> {Time}
          </p>
          <p style={{ margin: "0px" }}>
            <b style={{ color: "#ffc107" }}>Decription:</b>
            {Description.length > 20
              ? Description.substring(0, 20) + "..."
              : Description}
          </p>
        </div>
      </div>
    );
  };

  export default SmallProductView;
  