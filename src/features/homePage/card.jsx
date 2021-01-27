import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveCart, deleteItem } from "./homeSlice";
import { getCurrentUser } from "../../services/authService";
import "./card.css";

function Card({ url, url2, title, id, price, discount, label }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.entities.home.cart);
  const bool = cartItems.filter((item) => item.item === id).length === 0;
  const cartStyle = bool ? {} : { background: "#e67e22", color: "#fff" };
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
                <button>
                  <i className="fa fa-shopping-bag"></i>
                </button>
              </li>
              <li>
                <button
                  style={cartStyle}
                  onClick={() => dispatch(addRemoveCart(id, bool))}
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
