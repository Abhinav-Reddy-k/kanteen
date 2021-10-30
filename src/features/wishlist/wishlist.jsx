import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, getCart, getFoodItems } from "../homePage/homeSlice";
import "./wishlist.css";
import {
  delete_item_from_wishlist,
  emptyWishlist,
  getWishList,
} from "./wishlistSlice";

const WishList = () => {
  const wishlist = useSelector(getWishList);
  const food = useSelector(getFoodItems);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className="cart-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-heading mb-10">My wishlist</div>
              <div className="table-wishlist">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <thead>
                    <tr>
                      <th width="45%">Product Name</th>
                      <th width="15%">Unit Price</th>
                      <th width="15%">Stock Status</th>
                      <th>
                        <button
                          className="round-black-btn"
                          onClick={() => dispatch(emptyWishlist())}
                        >
                          Remove All
                        </button>
                      </th>
                      <th>
                        <Link to="/cart">
                          <button className="round-black-btn">My Cart</button>
                        </Link>
                      </th>
                      <th width="10%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((itemId) => {
                      let data = food.filter((item) => item._id === itemId);
                      let isItemInCart =
                        cart.filter((item) => item.item === itemId).length !==
                        0;
                      let isItemAvailable = data[0].availability;
                      const cartButtonStyle = isItemAvailable
                        ? isItemInCart
                          ? { pointerEvents: "none" }
                          : {}
                        : { pointerEvents: "none" };
                      return (
                        <tr>
                          <td width="45%">
                            <div className="display-flex align-center">
                              <div className="img-product">
                                <img
                                  src={data[0].url}
                                  alt=""
                                  className="mCS_img_loaded"
                                />
                              </div>
                              <div className="name-product">{data[0].name}</div>
                            </div>
                          </td>
                          <td width="15%" className="price">
                            ${data[0].price}
                          </td>
                          <td width="15%">
                            <span className="in-stock-box">
                              {data[0].availability
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </td>
                          <td width="15%">
                            <button
                              className="round-black-btn small-btn"
                              onClick={() =>
                                dispatch(delete_item_from_wishlist(itemId))
                              }
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                          <td width="15%">
                            <button
                              className="round-black-btn small-btn"
                              style={cartButtonStyle}
                              onClick={() => dispatch(addCart(itemId))}
                            >
                              <i className="fa fa-shopping-cart">
                                {isItemInCart ? " Added" : ""}
                              </i>
                            </button>
                          </td>
                          <td width="10%" className="text-center">
                            <a href="#" className="trash-icon">
                              <i className="far fa-trash-alt"></i>
                            </a>
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
    </Fragment>
  );
};

export default WishList;
