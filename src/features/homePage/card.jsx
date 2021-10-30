import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import {
  addItem,
  delete_item_from_wishlist,
  isItemInWishlist,
} from "../wishlist/wishlistSlice";
import "./card.css";
import {
  addCart,
  deleteItem,
  isItemAvailable,
  isItemInCart,
  removeCart,
} from "./homeSlice";

function Card({ url, url2, title, id, price, discount, label }) {
  const dispatch = useDispatch();
  const is_item_in_cart = useSelector(isItemInCart(id));
  const is_item_in_wishlist = useSelector(isItemInWishlist(id));
  const is_item_available = useSelector(isItemAvailable(id));
  const wishlist_icon_style = !is_item_in_wishlist
    ? {}
    : { background: "#e67e22", color: "#fff" };
  const cartStyle = is_item_available
    ? !is_item_in_cart
      ? {}
      : { background: "#e67e22", color: "#fff" }
    : { pointerEvents: "none" };
  return (
    <Fragment>
      <div className="col">
        <div className="product-grid3">
          <div className="product-image3">
            <p>
              <img className="pic-1" src={url} />
              <img className="pic-2" src={url2} />
            </p>
            <ul className="social">
              <li>
                <button
                  style={wishlist_icon_style}
                  onClick={
                    is_item_in_wishlist
                      ? () => {
                          dispatch(delete_item_from_wishlist(id));
                        }
                      : () => {
                          dispatch(addItem(id));
                        }
                  }
                >
                  <i className="fa fa-shopping-bag"></i>
                </button>
              </li>
              <li>
                <button
                  style={cartStyle}
                  onClick={
                    is_item_in_cart
                      ? () => {
                          dispatch(removeCart(id));
                        }
                      : () => {
                          dispatch(addCart(id));
                        }
                  }
                >
                  <i className="fa fa-shopping-cart"></i>
                </button>
              </li>
            </ul>
            <span className="product-new-label">{label}</span>
          </div>
          <div className="product-content">
            <h3 className="title">
              <a href="#">{title}</a>
            </h3>
            <div className="price">
              {`₹ ${price}`}
              <span>{`₹ ${price + discount}`}</span>
            </div>
            <ul className="rating">
              <li className="fa fa-star"></li>
              <li className="fa fa-star"></li>
              <li className="fa fa-star"></li>
              <li className="fa fa-star disable"></li>
              <li className="fa fa-star disable"></li>
            </ul>
          </div>
        </div>
        {getCurrentUser().isAdmin && (
          <Fragment>
            <button
              classNameName="btn btn-danger"
              onClick={() => dispatch(deleteItem(id))}
            >
              Delete
            </button>
            <Link to={`home/items/${id}`} classNameName="btn">
              Edit
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Card;
