import React, { Fragment, useEffect, useState } from 'react';
import "./Product.css"
import { useDispatch, useSelector } from "react-redux"
import { clearAllProducterror, getAllProduct } from "../../Actions/productAction"
import  Loader  from '../layout/loader/loader';
import ProductCard from "../Home/productcard"
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/metadta";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dipatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  // getting data from store using useSelector hook
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
     setCurrentPage(e)
  }
  
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
       dipatch(clearAllProducterror);
      }
      dipatch(getAllProduct(keyword, currentPage, price, category,ratings));
    }, [dipatch, keyword, currentPage, price, category,ratings,alert,error]);
    return (
      <Fragment>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className="productsHeading">Products</h2>
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {/* filter  */}

            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {/* pagination  */}
            {resultPerPage < productsCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    );
}

export default Products;