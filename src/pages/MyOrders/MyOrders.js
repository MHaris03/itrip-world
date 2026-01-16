import React, { useCallback, useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../store/auth-context";
import classes from "../Table.module.css";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    user: { email },
  } = useContext(AuthContext);

  const loadUserOrders = useCallback(async () => {
    try {
      const db = getFirestore();
      const ordersCollectionRef = collection(db, "Orders");
      const q = query(ordersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(userOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error loading user orders:", error);
    }
  }, [email]);

  useEffect(() => {
    loadUserOrders();
  }, [email, loadUserOrders]);

  const handleDelete = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30764a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const db = getFirestore();
          const orderDocRef = doc(db, "Orders", orderId);
          await deleteDoc(orderDocRef);
          loadUserOrders();
          Swal.fire("Deleted!", "Your Booking has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    });
  };
  let count = 1;
  return (
    <section className={classes.orders}>
      <div className="container-xl">
        <h2 className="section-heading" id="my-orders">
          My Orders
        </h2>
        <div className="row">
          <div className={`col-lg-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              {loading ? (
                <div className={classes.loaderContainer}>
                  <div className={classes.loader}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes["overflow-x"]}>
                  <table
                    style={{ width: "100%" }}
                    className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                  >
                    <thead>
                      <tr>
                        <th style={{ minWidth: "50px" }}>ID</th>
                        <th style={{ minWidth: "200px" }}>Name</th>
                        <th style={{ minWidth: "200px" }}>Tour Place</th>
                        <th style={{ minWidth: "150px" }}>Tour Date</th>
                        <th style={{ minWidth: "50px" }}>Tour Duration</th>
                        <th style={{ minWidth: "120px" }}>Price</th>
                        <th style={{ minWidth: "150px" }}>Status</th>
                        <th style={{ minWidth: "150px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.length === 0 && (
                        <tr>
                          <td
                            colSpan="8"
                            className={`${classes.center} ${classes.noData}`}
                          >
                            <b>Order Not Found</b>
                          </td>
                        </tr>
                      )}
                      {orders.map((order) => {
                        return (
                          <tr key={order.id}>
                            <td>{count++}</td>
                            <td>
                              {order?.Username}
                            </td>
                            <td>
                              <span
                                className={`${classes.mode} ${classes.mode_email}`}
                              >
                                {order.name}
                              </span>
                            </td>
                            <td>
                              {new Date(order.startDates).toLocaleDateString(
                                "en-US"
                              )}
                            </td>
                            <td>{order.duration} Days</td>
                            <td>
                              <span
                                className={`${classes.mode} ${classes.mode_email}`}
                              >
                                ${order.price}
                              </span>
                            </td>

                            <td>
                              <span
                                className={`${classes.mode} ${order.status === "approved"
                                  ? classes.mode_on
                                  : classes.mode_off
                                  }`}
                              >
                                {order.status === "pending" && "Pending"}
                                {order.status === "approved" && "Approved"}
                              </span>
                            </td>
                            <td>
                              <MdDelete
                                className={classes.delete}
                                onClick={() => handleDelete(order.id)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
