import React from "react";

export default function Features() {
  return (
    <div className="features row align-items-center">
      <div className="d-flex justify-content-center col-6 col-sm-6 col-md-3">
        <img
          src="https://images.prismic.io/jamcart/b824204c-f96a-41a8-9433-b32f2a6a71ca_box.svg?auto=compress,format"
          alt="Free Delivery"
          className="d-flex align-items-center"
        />
        <div>
          <h5>Self service</h5>
          <p>For all orders</p>
        </div>
      </div>
      <div className="d-flex justify-content-center col-6 col-sm-6 col-md-3">
        <img
          src="https://images.prismic.io/jamcart/caef7b6e-68b5-4701-9a51-0724be81c5c0_refund-box.svg?auto=compress,format"
          alt="Refundable"
        />
        <div>
          <h5>Refundable</h5>
          <p>
            Cancel order within time
            <br /> limit to refund it.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center col-6 col-sm-6 col-md-3">
        <img
          src="https://images.prismic.io/jamcart/fbb2f3f3-eb9e-4100-8eac-55b4b37e0b85_security.svg?auto=compress,format"
          alt="Secure Payment"
        />
        <div>
          <h5>Secure Payment</h5>
          <p>100% secure payment</p>
        </div>
      </div>
      <div className="d-flex justify-content-center col-6 col-sm-6 col-md-3">
        <img
          src="https://images.prismic.io/jamcart/969d88bb-10f4-45c2-9289-b67cdfb0c634_help.svg?auto=compress,format"
          alt="24/7 Customer Support"
        />
        <div>
          <h5>24/7 Customer Support</h5>
          <p>We have dedicated support</p>
        </div>
      </div>
    </div>
  );
}
