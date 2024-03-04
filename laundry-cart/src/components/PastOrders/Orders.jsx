import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { contextProvider } from "../../Context/Context";
import { format } from "date-fns";
import PastOrderSummary from "./PastOrderSummary";
import "./orders.css";
import Alert from "../Alert/Alert";
import FilterOrder from "./FilterOrder";
// import FilterPastOrder from "./FilterOrder";

const Orders = () => {
  const Navigate = useNavigate();
  const [search, setsearch] = useState([]);

  const [serchtoggle, setSerchtoggle] = useState(true);

  let filterOrder = [];

  const {
    PastOrders,
    FilterdPastOrder,
    getAllPastOrders,
    pastOrderSummaryToggle,
    setPastOrderSummaryToggle,
    cancelToggle,
    viewOrder,
    setViewOrder,
  } = contextProvider();
  const location = useLocation();

  // const [Porders, setPorders] = useState([]);

  useEffect(() => {
    getAllPastOrders();
  }, [location.pathname === "/orders"]);
  let finalPrice = 0;

  let pOrders = [];
  {
    PastOrders.map((order) => {
      let temOrder = [];
      temOrder.push(
        order.order,
        order.createdAt,
        order.storeLocation,
        order.storePhoneNumber,
        order.userAddress,
        order.storeCity,
        order._id,
        order.finalQuantity,
        order.status
      );
      pOrders.push(temOrder);
    });
  }

  const filterPastOrder = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setSerchtoggle(false);

      // Navigate("/filter");
      pOrders.filter((product) => {
        if (product[6] === e.target.value) {
          setsearch(product);
        }
      });

      setSerchtoggle(false);

      // Navigate("/filter");
    }
  };

  const handleEye = async (id) => {
    const response = await fetch(
      `https://laundry-cart-backend-c8cj.onrender.com/orders/orders/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();

    filterOrder.push(result);

    setViewOrder(filterOrder[0]);

    setPastOrderSummaryToggle(!pastOrderSummaryToggle);
    Navigate("/orders");
  };

  return (
    <>
      {!serchtoggle ? (
        <FilterOrder Orders={search} handleEye={handleEye} />
      ) : (
        <>
          <div className="pastOrder">
            <div className="inputHolder">
              <span>orders {PastOrders.length}</span>
              <div className="btn">
                <button>
                  <Link to="/products">create</Link>
                </button>
                <FaSearchPlus className="serchIcon" />
                <input
                  type="text"
                  onKeyDown={filterPastOrder}
                  placeholder="Press Enter button to find result"
                />
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Date & Time</th>
                  <th>Store Location</th>
                  <th>City</th>
                  <th>Store Phone</th>
                  <th>Total Items</th>
                  <th>Price</th>
                  <th>Status</th>
                  {search}
                  <th style={{ minWidth: "90px" }}>View</th>
                </tr>
              </thead>
              <tbody>
                {pOrders.map((order, index) => {
                  finalPrice = 0;
                  return (
                    <tr key={index}>
                      <td>{order[6]} </td>
                      <td>
                        {format(new Date(order[1]), "dd MMM yyyy, HH:mm")}{" "}
                      </td>
                      <td>{order[2]}</td>
                      <td>{order[5]}</td>
                      <td>{order[3]}</td>
                      <td>{order[7]}</td>

                      <td>
                        {order[0].map((price, index) => {
                          finalPrice += price[4];
                          if (order[0].length - 1 === index) {
                            return finalPrice;
                          }
                        })}
                      </td>
                      <td>{order[8]}</td>
                      <td>
                        <FiEye onClick={() => handleEye(order[6])} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {pastOrderSummaryToggle && (
              <PastOrderSummary filter={filterOrder} />
            )}
            {cancelToggle && (
              <Alert
                id={viewOrder._id}
                setserchtoggle={setSerchtoggle}
                serchtoggle={serchtoggle}
              />
            )}
            {/* {cancelToggle && <div className="pos-hidden"></div>} */}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
