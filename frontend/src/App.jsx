import "./App.css";
import Header from "./componets/layout/header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./componets/layout/footer.jsx/Footer";
import Home from "./componets/Home/home";
import ProductDetails from "./componets/Product/ProductDetails";
import Products from "./componets/Product/Product";
import Search from "./componets/Product/Search";
import Cart from "./componets/Cart/Cart";
import LoginSignup from "./componets/User/LoginSignup";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import UserOption from "./componets/layout/header/userOption";
import { useSelector } from "react-redux";
import Profile from "./componets/User/Profile";
import UpdateProfile from "./componets/User/UpdateProfile";
import Updatepassword from "./componets/User/Updatepassword";
import Forgotpassword from "./componets/User/forgotpasswod";
import ResetPass from "./componets/User/ResetPass";
import Shipping from "./componets/Cart/Shipping";
import Confirmorder from "./componets/Cart/Confirmorder";
import Payment from "./componets/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./componets/Cart/OrderSuccess";
import MyOrder from "./Order/MyOrder";
import OrderDetails from "./Order/OrderDetails";
import DashBoard from "./componets/Admin/DashBoard";
import ProductList from "./componets/Admin/ProductList";
import NewProduct from "./componets/Admin/NewProduct";
import UpdateProduct from "./componets/Admin/UpdateProduct";
import OrderList from "./componets/Admin/OrderList";
import ProcessOrder from "./componets/Admin/ProcessOrder";
import UserList from "./componets/Admin/UserList";
import UpdateUser from "./componets/Admin/UpdateUser";
import ProductReview from "./componets/Admin/ProductReview";
import About from "./componets/layout/footer.jsx/About";
import Contact from "./componets/layout/footer.jsx/Contact";
function App(isAdmin) {
  const { isAuthenticated, user} = useSelector((state) => state.user);
  
   const [stripeApiKey, setStripeApiKey] = useState("");

   async function getStripeApiKey() {
     const { data } = await axios.get("/api/v1/stripeapikey");

     setStripeApiKey(data.stripeApiKey);
   }

  useEffect(() => {
     WebFont.load({
       google: {
         families: ["Roboto", "Droid Sans", "Chilanka"],
       },
     });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);

  

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              {isAuthenticated && (
                <Route path="/process/payment" element={<Payment />}></Route>
              )}
            </Routes>
          </Elements>
        )}

        <Routes>
          <Route path={"/"} element={<Home></Home>} />
          <Route
            path={"/product/:id"}
            element={<ProductDetails></ProductDetails>}
          />
          <Route path={"/products"} element={<Products></Products>} />
          <Route path={"/products/:keyword"} element={<Products></Products>} />
          <Route path={"/search"} element={<Search></Search>} />
          <Route path={"/cart"} element={<Cart></Cart>} />
          <Route path={"/login"} element={<LoginSignup></LoginSignup>} />
          {isAuthenticated && (
            <Route path="/account" element={<Profile></Profile>}></Route>
          )}
          {isAuthenticated && (
            <Route path="/me/update" element={<UpdateProfile />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/password/update" element={<Updatepassword />}></Route>
          )}

          <Route path="/password/forgot" element={<Forgotpassword />}></Route>
          <Route path="/password/rseset/:token" element={<ResetPass />}></Route>
          {isAuthenticated && (
            <Route path="/shipping" element={<Shipping />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/order/confirm" element={<Confirmorder />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/success" element={<OrderSuccess />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/orders" element={<MyOrder />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/order/:id" element={<OrderDetails />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/dashboard" element={<DashBoard />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/dashboard" element={<DashBoard />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/products" element={<ProductList />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/product" element={<NewProduct />}></Route>
          )}

          {isAuthenticated && (
            <Route
              path="/admin/product/:id"
              element={<UpdateProduct />}
            ></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/orders" element={<OrderList />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/order/:id" element={<ProcessOrder />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/users" element={<UserList />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/user/:id" element={<UpdateUser />}></Route>
          )}

          {isAuthenticated && (
            <Route path="/admin/reviews" element={<ProductReview />}></Route>
          )}

          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
