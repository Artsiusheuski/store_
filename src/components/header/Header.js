import { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./img/a-logo.png";
import cart from "./img/cart.png";
import SelectCurrency from "../currency/SelectCurrency";
import "./header.css";
import client from "../data";
import { CATEGORY_NAMES } from "../data/data";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
    };
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
              <Link to={"/cart"}>
                <img className="cart" src={cart} alt="cart" title="cart" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
