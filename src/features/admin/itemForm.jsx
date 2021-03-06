import React from "react";
import Forms from "../../common/forms";
import { connect } from "react-redux";
import { addItem, updateItem } from "../homePage/homeSlice";
import { toast } from "react-toastify";
import "./../stateless/Login.css";
const Joi = require("@hapi/joi");

class ItemForm extends Forms {
  state = {
    data: {
      _id: "new",
      name: "",
      url: "",
      url2: "",
      category: "",
      price: "",
      discount: "",
      label: "",
      availability: true,
    },
    categories: ["MilkShake", "Fried Rice", "Drinks"],
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).required().label("Name"),
    url: Joi.string(),
    price: Joi.number().max(500).min(0).label("Price").required(),
    // discount: Joi.number(),
    // label: Joi.string(),
  })
    .options({ abortEarly: false })
    .unknown(true);

  populateItems() {
    try {
      const itemId = this.props.match.params.id;
      if (itemId === "new") return;
      const item = this.props.foodItems.filter((item) => item._id === itemId);
      this.setState({ data: item[0] });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/pageNotFound");
    }
  }

  componentDidMount() {
    this.populateItems();
  }

  doSubmit = () => {
    const user = this.props.user;
    if (user && user.isAdmin) {
      const item = this.state.data;
      if (item._id !== "new") {
        const id = item._id;
        delete item._id;
        delete item.__v;
        this.props.updateItem(item, id);
      } else {
        delete item._id;
        this.props.addItem(item);
      }
      toast.success("Item Saved Succesfully");
    } else toast.error("You cannot save or add new food item");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="main">
        <h1 className="m-3 sign">Item Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("category", this.state.categories)}
          {this.renderInput("url", "Image url")}
          {this.renderInput("url2", "Image url2")}
          {this.renderInput("price", "Price")}
          {this.renderInput("discount", "Discount")}
          {this.renderInput("label", "Label")}
          {this.renderInput("availability", "Availability")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodItems: state.entities.home.food,
  user: state.entities.home.user,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  updateItem: (item, id) => dispatch(updateItem(item, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
