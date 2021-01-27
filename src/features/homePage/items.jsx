import React from "react";
import Card from "./card";

function Items({ foodItems }) {
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 m-4 justify-content-around">
      {foodItems.map((item) => (
        <Card
          discount={item.discount}
          label={item.label}
          price={item.price}
          url={item.url}
          url2={item.url2}
          title={item.name}
          id={item._id}
          key={item._id}
        />
      ))}
    </div>
  );
}

export default Items;
