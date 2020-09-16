import React from "react";

function Card({ url, title }) {
  const cardStyle = {
    width: "18rem"
  };
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
      </div>
    </div>
  );
}

export default Card;
