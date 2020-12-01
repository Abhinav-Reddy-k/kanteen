import React from "react";
import Card from "./card";

function Items({ foodItems }) {
  return foodItems.map((item) => (
        <Card
          price={item.price}
          url={item.url}
          url2={item.url2}
          title={item.name}
          id={item._id}
          key={item._id}
        />
  ));
}

export default Items;
