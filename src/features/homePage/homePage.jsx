import React, { useEffect, Fragment } from "react";
import { getCurrentUser } from "./../../services/authService";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFood, loadCart } from "./homeSlice";
import Header from "../header/headerComp";
import "./homePage.css";
import Features from "./features";
import Items from "./items";
import Categories from "./categories";
import ScrollUpButton from "react-scroll-up-button";


const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFood());
    dispatch(loadCart());
  });
  const food = useSelector((state) => state.entities.home.food);
  const category = useSelector((state) => state.entities.home.category);
  let foodItems =
    category !== "All"
      ? food.filter((item) => item.category === category)
      : food;

  if (!getCurrentUser()) return <Redirect to={"/login"} />;

  return (
    <Fragment>
      <Header />
      <Features />
      {getCurrentUser().isAdmin && (
        <Link to="/home/items/new" className="btn btn-primary">
          Add new item
        </Link>
      )}
      <Categories tabs={["All", "MilkShake", "Fried Rice", "Drinks"]} />
      <div className="container row">
        <Items foodItems={foodItems} />
      </div>
      <ScrollUpButton />
    </Fragment>
  );
};

export default HomePage;
