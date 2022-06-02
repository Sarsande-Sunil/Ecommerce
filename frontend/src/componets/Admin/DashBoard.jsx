import React,{useEffect} from "react";
import "./DashBoard.css";
import SideBar from "./SideBar";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../layout/metadta";
import { Doughnut, Line } from "react-chartjs-2";
import {
  getAdminProduct,
} from "../../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../Actions/Orderaction";
import { getAllUsers } from "../../Actions/userAction";
const DashBoard = () => {
   const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

   let outOfStock = 0;

   products &&
     products.forEach((item) => {
       if (item.stock === 0) {
         outOfStock += 1;
       }
     });
  
   let totalAmount = 0;
   orders &&
     orders.forEach((item) => {
       totalAmount += item.totalPrice;
     });
  
   useEffect(() => {
     dispatch(getAdminProduct());
     dispatch(getAllOrders());
     dispatch(getAllUsers());
   }, [dispatch]);
    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    };

     const doughnutState = {
       labels: ["Out of Stock", "InStock"],
       datasets: [
         {
           backgroundColor: ["#00A6B4", "#6800B4"],
           hoverBackgroundColor: ["#4B5000", "#35014F"],
           data: [outOfStock, products.length - outOfStock],
         },
       ],
     };
    return (
      <div className="dashboard">
        <MetaData title={"DashBoard--Admin--Pannel"} />
        <SideBar />
        <div className="dashboardContainer">
          <Typography component={"h1"}>DashBoard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    );
};

export default DashBoard;
