import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import logo from "./img/a-logo.png";
import cart from "./img/cart.png";
import SelectCurrency from "../currency/SelectCurrency";
import { connect } from "react-redux";
import ForOverlay from "./ForOverlay";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayCart: "conteiner_cart_overlay_none",
    };
    this.btnCartOverlay = this.btnCartOverlay.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  btnCartOverlay() {
    if (this.state.displayCart === "conteiner_cart_overlay_none") {
      this.setState({
        displayCart: "conteiner_cart_overlay",
      });
    }
    if (this.state.displayCart === "conteiner_cart_overlay") {
      this.setState({
        displayCart: "conteiner_cart_overlay_none",
      });
    }
    if (!this.props.count) {
      this.setState({
        displayCart: "conteiner_cart_overlay_none",
      });
      alert("Your cart is empty"); // for exemple, it could with modal window
    }
  }

  handleClickOutside(event) {
    const cartOverlay = document.querySelector(".conteiner_cart_overlay");
    const classOverlay = event.target.offsetParent.className;
    if (
      classOverlay !== "wrapper_cart_overlay" &&
      classOverlay !== "conteiner_cart_overlay" &&
      cartOverlay !== null
    )
      this.btnCartOverlay();
  }

  render() {
    return (
      <>
        <header onClick={this.handleClickOutside} className="header">
          <nav className="header_nav">
            <ul>
              {this.props.namesCategory.map((item, id) => (
                <li onClick={() => this.props.getPathName(item)} key={id}>
                  <NavLink className="for_link" to={item}>
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
            <img className="logo" src={logo} alt="logo" title="Head page" />
            <ul className="header_cart_currency">
              <li>
                <SelectCurrency />
              </li>
              <li className="header_cart_met">
                <span>
                  <img
                    onClick={this.btnCartOverlay}
                    className="cart"
                    src={cart}
                    alt="cart"
                    title="cart"
                  />
                </span>
                <span
                  onClick={this.btnCartOverlay}
                  className={this.props.count ? "classCountCart" : undefined}>
                  {this.props.count !== 0 && this.props.count}
                </span>
              </li>
            </ul>
          </nav>
        </header>
        <ForOverlay
          count={this.props.count}
          displayCart={this.state.displayCart}
          btnCartOverlay={this.btnCartOverlay}
          handleClickOutside={this.handleClickOutside}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  count:
    Object.values(state.cart.summ).length > 0 &&
    Object.values(state.cart.summ).reduce((a, b) => a + b),
});
export default connect(mapStateToProps)(Header);
