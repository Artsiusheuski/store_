import React, { PureComponent } from "react";
import CartOverlay from "../cart/CartOverlay";

export default class ForOverlay extends PureComponent {
  render() {
    return (
      <section
        onClick={this.props.handleClickOutside}
        className={
          this.props.count < 1
            ? "conteiner_cart_overlay_none"
            : this.props.displayCart
        }
      >
        <div className="wrapper_cart_overlay">
          <h1 className="title_cart_overlay">
            My Bag,{" "}
            <span>
              {this.props.count} {this.props.count > 1 ? "items" : "item"}
            </span>
          </h1>
          <CartOverlay btnCartOverlay={this.props.btnCartOverlay} />
        </div>
      </section>
    );
  }
}
