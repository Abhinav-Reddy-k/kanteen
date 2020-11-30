import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveCart, deleteItem } from "./homeSlice";
import { getCurrentUser } from "../../services/authService";
import "./card.css";

function Card({ url, title, id, price }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.entities.home.cart);
  const bool = cartItems.filter((item) => item.item === id).length === 0;
  const cartStyle = bool ? {} : { background: "#e67e22", color: "#fff" };
  return (
    <Fragment>
      <div className="col-md-3 col-sm-6">
        <div className="product-grid3">
          <div className="product-image3">
            <a href="#">
              <img className="pic-1" width="300" height="400" src={url} />
              <img className="pic-2" width="300" height="400" src={url} />
            </a>
            <ul className="social">
              <li><button><i className="fa fa-shopping-bag"></i></button></li>
              <li><button style={cartStyle} onClick={() => dispatch(addRemoveCart(id, bool))}><i className="fa fa-shopping-cart" ></i></button></li>
            </ul>
            <span className="product-new-label">New</span>
          </div>
          <div className="product-content">
            <h3 className="title"><a href="#">{title}</a></h3>
            <div className="price">
              {`₹ ${price}`}
              <span>{`₹ ${price + 5}`}</span>
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
      </div>
      <div>
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
      <hr></hr>
    </Fragment>
  );
}

export default Card;
