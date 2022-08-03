import { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "./img/a-logo.png";
import cart from "./img/cart.png";
import SelectCurrency from "../currency/SelectCurrency";
import "./header.css";
import client from "../data";
import { CATEGORY_NAMES } from "../data/data";
import { connect } from "react-redux";
import CartOverlay from "../cart/CartOverlay";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
      displayCart: "conteiner_cart_overlay_none",
    };
    this.btnCartOverlay = this.btnCartOverlay.bind(this);
  }

  btnCartOverlay() {
    console.log("ok");
    if (this.state.displayCart === "conteiner_cart_overlay_none") {
      this.setState({
        displayCart: "conteiner_cart_overlay",
      });
    } else {
      this.setState({
        displayCart: "conteiner_cart_overlay_none",
      });
    }
  }

  componentDidMount() {
    client
      .query({
        query: CATEGORY_NAMES,
      })
      .then((result) =>
        this.setState({
          names: result.data.categories,
        })
      );
  }
  render() {
    return (
      <>
        <header className="header">
          <nav className="header_nav">
            <ul>
              {this.state.names.map((item, id) => (
                <li key={id}>
                  <NavLink className="for_link" to={item.name}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <img className="logo" src={logo} alt="logo" title="Head page" />
            <ul className="header_cart_currency">
              <li>
                <SelectCurrency />
              </li>
              <li>
                <span>
                  <img
                    onClick={this.btnCartOverlay}
                    className="cart"
                    src={cart}
                    alt="cart"
                    title="cart"
                  />
                </span>
                <span className={this.props.count && "classCountCart"}>
                  {this.props.count}
                </span>
              </li>
            </ul>
          </nav>
        </header>
        <section className={this.state.displayCart}>
          <CartOverlay />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.cart.count,
});
export default connect(mapStateToProps)(Header);
