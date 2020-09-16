import React from "react";
import Card from "./card";

function Items({ foodItems }) {
  return foodItems.map((item) => <Card url={item.url} title={item.name} />);
}

export default Items;
