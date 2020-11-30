import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../homePage/homeSlice";
import "./cart.css";

function Cart() {
  const cart = useSelector((state) => state.entities.home.cart);
  const food = useSelector((state) => state.entities.home.food);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div class="cart-wrap">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="main-heading">Shopping Cart</div>
              <div class="table-cart">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(obj => {
                      let data = food.filter(item => item._id === obj.item);
                      // console.log(data);
                      return (
                        <tr>
                          <td>
                            <div class="display-flex align-center">
                              <div class="img-product">
                                <img src={data[0].url} class="mCS_img_loaded" />
                              </div>
                              <div class="name-product">
                                {data[0].name}
                                <br />
                              </div>
                              <div class="price">
                                {data[0].price}
                              </div>
                            </div>
                          </td>
                          <td class="product-count">
                            <form action="#" class="count-inlineflex">
                              <div onClick={() => dispatch(setQuantity(obj.item,obj.quantity-1))} class="qtyminus">-</div>
                              <input type="text" name="quantity" value={obj.quantity} class="qty" />
                              <div onClick={() => dispatch(setQuantity(obj.item,obj.quantity+1))} class="qtyplus">+</div>
                            </form>
                          </td>
                          <td>
                            <div class="total">
                              {data[0].price*obj.quantity}
	                                    </div>
                          </td>
                          <td>
                            <a href="#" title="">
                              <img src="images/icons/delete.png" alt="" class="mCS_img_loaded" />
                            </a>
                          </td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <div class="coupon-box">
                  <form action="#" method="get" accept-charset="utf-8">
                    <div class="coupon-input">
                      <input type="text" name="coupon code" placeholder="Coupon Code" />
                      <button type="submit" class="round-black-btn">Apply Coupon</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart-totals">
                <h3>Cart Totals</h3>
                <form action="#" method="get" accept-charset="utf-8">
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td class="subtotal">$2,589.00</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td class="free-shipping">Free Shipping</td>
                      </tr>
                      <tr class="total-row">
                        <td>Total</td>
                        <td class="price-total">$1,591.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="btn-cart-totals">
                    <a href="#" class="update round-black-btn" title="">Update Cart</a>
                    <a href="#" class="checkout round-black-btn" title="">Proceed to Checkout</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
