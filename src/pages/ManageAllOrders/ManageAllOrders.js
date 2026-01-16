import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FcOk } from "react-icons/fc";
import classes from "../Table.module.css";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; 

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const adminEmail = "furqan@gmail.com"; // Replace with your admin email

  const loadOrders = async () => {
    try {
      // Initialize Firebase Firestore
      const db = getFirestore();

      // Reference to the "Orders" collection in Firebase
      const ordersCollectionRef = collection(db, "Orders");

      // Create a query to get all orders
      const q = query(ordersCollectionRef);

      // Fetch orders data from Firebase
      const querySnapshot = await getDocs(q);

      // Map querySnapshot to an array of orders
      const allOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set the orders in state
      setOrders(allOrders);
    } catch (error) {
      console.error("Error loading all orders:", error);
    }
  };

  // Load all orders when the component mounts
  useEffect(() => {
    loadOrders();
  }, []);

  // Order delete handler
  const handleDelete = async (_id) => {
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

          const orderDocRef = doc(db, "Orders", _id);

          await deleteDoc(orderDocRef);

          loadOrders();

          Swal.fire("Deleted!", "User's Booking has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    });
  };

  const handleApprove = async (_id) => {
    try {
      const db = getFirestore();

      const orderDocRef = doc(db, "Orders", _id);

      await updateDoc(orderDocRef, {
        status: "approved",
      });

      loadOrders();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  let count = 1;

  return (
    <section className={classes.orders}>
      <div className="container">
        <h2 className="section-heading">All Orders</h2>
        <div className="row">
          <div className={`col-md-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              <div className={classes["overflow-x"]}>
                <table
                  style={{ width: "100%" }}
                  className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>ID</th>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "280px" }}>Email</th>
                      <th style={{ minWidth: "280px" }}>Phone Number</th>
                      <th style={{ minWidth: "280px" }}>Designation</th>
                      <th style={{ minWidth: "80px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Status</th>
                      <th style={{ minWidth: "250px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
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
                              {order.email}
                            </span>
                          </td>
                          <td>{order.phone}</td>
                          <td>{order.name}</td>
                          <td>${order.price}</td>
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
                            {/* {order.email === adminEmail && ( */}
                              <>
                                {order.status === "pending" && (
                                  <button
                                    className={`btn btn-sm me-3 ${classes.mark}`}
                                    onClick={() => handleApprove(order.id)}
                                  >
                                    Mark as Approved <FcOk />
                                  </button>
                                )}
                                <MdDelete
                                  className={classes.delete}
                                  onClick={() => handleDelete(order.id)}
                                />
                              </>
                            {/* )} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAllOrders;
