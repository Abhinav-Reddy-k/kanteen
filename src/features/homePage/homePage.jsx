import React, { useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFood, loadCart } from "./homeSlice";
import Header from "../header/headerComp";
import "./homePage.css";
import Features from "./features";
import Items from "./items";
import Categories from "./categories";
import ScrollUpButton from "react-scroll-up-button";
import { loadWishlist } from "../wishlist/wishlistSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFood());
    if (getCurrentUser()) {
      dispatch(loadCart());
      dispatch(loadWishlist());
    }
  });
  const food = useSelector((state) => state.entities.home.food);
  const category = useSelector((state) => state.entities.home.category);
  let foodItems =
    category !== "All"
      ? food.filter((item) => item.category === category)
      : food;

  if (!getCurrentUser()) return <Redirect to={"/login"} />;

  return (
    <>
      <Header />
      <Features />
      {getCurrentUser().isAdmin && (
        <Link to="/home/items/new" className="btn btn-primary">
          Add new item
        </Link>
      )}
      <Categories
        active={category}
        tabs={["All", "MilkShake", "Fried Rice", "Drinks"]}
      />
      <Items className="container" foodItems={foodItems} />
      <ScrollUpButton />
    </>
  );
};

export default HomePage;
