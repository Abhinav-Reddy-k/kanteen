import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteItem } from "./homeSlice";

function Card({ url, title, id, price }) {
  const cardStyle = {
    width: "18rem"
  };
  const dispatch = useDispatch();
  return (
    <div className="card" style={cardStyle}>
      <img
        src={url}
        className="card-img-top"
        alt="..."
        width="200"
        height="300"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <button className="btn btn-primary">Add to cart</button>
        <p className="badge badge-dark m-2">{`₹ ${price}`}</p>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteItem(id))}
        >
          Delete
        </button>
        <Link to={`home/items/${id}`} className="btn">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default Card;
