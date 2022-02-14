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

import { AddMassage, RemoveAllMassage,  RemoveMassage } from "../Store/Action/Actions";
import { useDispatch, useSelector } from "react-redux";

const AdminMassages = () => {
  const AllMassages = useSelector((state) => state.AllMassages);
  const dispatch = useDispatch();

  useEffect(() => {
    onChildAdded(ref(getDatabase(), `/Massages`), (snap) => {
      dispatch(AddMassage({ ...snap.val(), key: snap.key }));
    });
    onChildRemoved(ref(getDatabase(), `/Massages`), (snap) => {
      dispatch(RemoveMassage({ ...snap.val(), key: snap.key }));
    });

    return () => {
      off(ref(getDatabase(), `/Massages`));
      dispatch(RemoveAllMassage(null));
    };
  }, []);

  const MassageDelete = (MSG_ID) => {
    remove(ref(getDatabase(), `/Massages/${MSG_ID}`));
  };

  return (
    <div>
      <h4>All Massages</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Email</th>
            <th scope="col">From</th>
            <th scope="col">Date</th>
            <th scope="col">Massage</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {AllMassages.map((Massage, index) => {
            return (
              <MassageRow
                key={index}
                data={Massage}
                index={index}
                MassageDelete={MassageDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const MassageRow = ({ data, index, MassageDelete }) => {
  const { ProductId, FullName, eamil, Msg, Country, date, key } = data;
  const [expend, setexpend] = useState(false);
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
      <td>{FullName}</td>
      <td>{eamil}</td>
      <td style={{ color: "#ffc107" }}>{Country}</td>
      <td>{date}</td>
      <td style={{ maxWidth: "250px" }}>
        {Msg.length > 100
          ? expend
            ? Msg
            : Msg.substring(0, 100) + "..."
          : Msg}
      </td>

      <td>
        <div style={{ display: "flex" }}>
          {Msg.length > 100 ? (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => setexpend(!expend)}
            >
              {expend ? "squeeze" : "expand"}
            </button>
          ) : null}

          <button
            style={{ marginLeft: "5px" }}
            type="button"
            className="btn btn-dark"
            onClick={() => MassageDelete(key)}
          >
            delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminMassages;

// const Massage = (props) => {
//   const [ProductData, setProductData] = useState({
//     Image:
//       "https://firebasestorage.googleapis.com/v0/b/my-shop-11ad7.appspot.com/o/Icons%2Fimages.jpg?alt=media&token=045dc65b-dc44-43d2-bd65-f91a97ef79a7",
//     Title: "",
//     Price: "",
//     Time: "2 to 3 Days",
//     Description: "",
//   });

//   const { ProductId, FullName, eamil, Msg, Country, status } = props.data;

//   useEffect(() => {
//     get(child(ref(getDatabase()), `/AllProducts/${ProductId}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setProductData({
//             Image: snapshot.val().image,
//             Title: snapshot.val().title,
//             Price: snapshot.val().price,
//             Time: snapshot.val().time,
//             Description: snapshot.val().decription,
//           });
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   return (
//     <div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Image</th>
//             <th scope="col">Name</th>
//             <th scope="col">Price</th>
//             <th scope="col">Time</th>
//             <th scope="col">Decription</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {AllMassages.map((Massage, index) => {
//             return <MassageRow key={index} data={Massage} index={index} />;
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   // (
//   //   <div className="MassageDetailParrent">
//   //     <SmallProductView data={ProductData} />
//   //     <div className="MassageDetails" style={{ textAlign: "left" }}>
//   //       <p>
//   //         <b style={{ color: "#ffc107", marginLeft: "5px" }}>Customer :</b>
//   //       </p>

//   //       <p>
//   //         <b style={{ color: "#ffc107", marginLeft: "25px" }}>Name:</b>
//   //         {FullName}
//   //       </p>
//   //       <p>
//   //         <b style={{ color: "#ffc107", marginLeft: "25px" }}>Email:</b>
//   //         {eamil}
//   //       </p>
//   //       <p>
//   //         <b style={{ color: "#ffc107", marginLeft: "25px" }}>From:</b>
//   //         {Country}
//   //       </p>
//   //       <p style={{maxWidth:"600px"}} >
//   //         <b style={{ color: "#ffc107", margin: "0px" }}>Massage:</b>
//   //         {Msg}
//   //       </p>
//   //     </div>

//   //   </div>
//   // );
// };
