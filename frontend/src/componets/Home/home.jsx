import React, { Fragment, useEffect } from 'react';
import "./home.css"
import ProductCard from './productcard';
import MetaData from '../layout/metadta';
import { clearAllProducterror,getAllProduct } from "../../Actions/productAction";
import { useDispatch,useSelector } from "react-redux";
import Loader from '../layout/loader/loader';
import { useAlert } from "react-alert";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch()
  const { loading,error,products} = useSelector(
    (state)=>state.products,
  );
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearAllProducterror);
    }
    dispatch(getAllProduct());
  },[dispatch,error,alert]);
    return (
      <Fragment>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            <MetaData title="ECOMMERCE" />
            <div className="banner">
              <p>Welcome to Our Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>

              <a href="#container">
                <button>Scroll</button>
              </a>
            </div>

            <h2 className="homeHeading">Product Features</h2>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}

export default Home;