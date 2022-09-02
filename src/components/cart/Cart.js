import React, { PureComponent } from "react";
import "./cart.css";
import CartOverlay from "./CartOverlay";

export default class Cart extends PureComponent {
  render() {
    return (
      <>
        <section className="wrapper_cart_section">
          <h1>CART</h1>
          <div className="cart_wrapper">
            <CartOverlay />
          </div>
        </section>
      </>
    );
  }
}
