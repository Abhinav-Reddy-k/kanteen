import React from "react";
import Forms from "../../common/forms";
import { connect } from "react-redux";
import { getItem, addItem } from "../homePage/homeSlice";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";
import "./../stateless/Login.css";
const Joi = require("@hapi/joi");

class ItemForm extends Forms {
  state = {
    data: {
      _id: "new",
      name: "",
      url: "",
      category: "",
      price: "",
      availability: "",
      __v: ""
    },
    categories: ["MilkShake", "Chinese", "Shakes", "Cold Drinks"],
    errors: {}
  };

  schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    url: Joi.string(),
    price: Joi.number().max(500).min(0).label("Price").required()
  })
    .options({ abortEarly: false })
    .unknown(true);

  populateItems() {
    try {
      const itemId = this.props.match.params.id;
      if (itemId === "new") return;
      const item = getItem(this.props.foodItems, itemId);
      console.log(item);
      this.setState({ data: item });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/pageNotFound");
    }
  }

  componentDidUpdate() {
    this.populateItems();
  }

  doSubmit = () => {
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      this.props.addItem(this.state.data);
      toast.success("Movie Saved Succesfully");
    } else toast.error("You cannot save a movie");
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="main">
        <h1 className="m-3 sign">Item Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("category", this.state.categories)}
          {this.renderInput("url", "Image url")}
          {this.renderInput("price", "Price")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodItems: state.entities.home.food
});

const mapDispatchToProps = (dispach) => {
  return {
    addItem: (item) => dispach(addItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
