import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { contextProvider } from "../../Context/Context";
import { format } from "date-fns";
import PastOrderSummary from "./PastOrderSummary";
import "./orders.css";
import Alert from "../Alert/Alert";
// import FilterPastOrder from "./FilterPastOrder";

const FilterOrder = ({
  Orders,
  handleEye,

  filterOrder,
}) => {
  let finalPrice = 0;

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

  //   {
  //     pOrders.map((order) => {
  //       let temOrder = [];
  //       temOrder.push(
  //         order.order,
  //         order.createdAt,
  //         order.storeLocation,
  //         order.storePhoneNumber,
  //         order.userAddress,
  //         order.storeCity,
  //         order._id,
  //         order.finalQuantity,
  //         order.status
  //       );
  //       pOrders.push(temOrder);
  //     });
  //   }

  return (
    <>
      {Orders.length === 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "500px",
              width: "1440px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>404 Not Found</h1>
            <h2>Invalid Product Id </h2>
            <h2>Please Provide Valid Id</h2>
          </div>
        </>
      ) : (
        <div className="pastOrder">
          <div className="inputHolder">
            <span>orders 0</span>
            <div className="btn">
              <button>
                <Link to="/products">create</Link>
              </button>
              <FaSearchPlus className="serchIcon" />
              <input
                type="text"
                //   onChange={(e) => filterPastOrder(e.target.value)}
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

                <th style={{ minWidth: "90px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Orders[6]} </td>
                <td>{format(new Date(Orders[1]), "dd MMM yyyy, HH:mm")} </td>
                <td>{Orders[2]}</td>
                <td>{Orders[5]}</td>
                <td>{Orders[3]}</td>
                <td>{Orders[7]}</td>

                <td>
                  {Orders[0].map((price, index) => {
                    finalPrice += price[4];
                    if (Orders[0].length - 1 === index) {
                      return finalPrice;
                    }
                  })}
                </td>
                <td>{Orders[8]}</td>
                <td>
                  <FiEye onClick={() => handleEye(Orders[6])} />
                </td>
              </tr>
            </tbody>
          </table>
          {pastOrderSummaryToggle && <PastOrderSummary filter={filterOrder} />}
          {cancelToggle && <Alert id={viewOrder._id} />}
          {/* {cancelToggle && <div className="pos-hidden"></div>} */}
        </div>
      )}
    </>
  );
};

export default FilterOrder;
