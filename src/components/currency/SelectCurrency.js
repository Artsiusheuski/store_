import React from "react";
import { Component } from "react";
import "./currency.css";
import client from "../data/index";
import { CURRENCY_DETIALS } from "../data/data";

export default class SelectCurrency extends Component {
  constructor() {
    super();
    this.state = {
      classBlock: "display_none",
      arrow: "arrow",
      currency: [],
      value: "",
    };

    this.dropDown = this.dropDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: CURRENCY_DETIALS,
      })
      .then((result) =>
        this.setState({
          currency: result.data.currencies,
          value: result.data.currencies[0].symbol,
        })
      );
  }

  dropDown() {
    this.state.classBlock === "select"
      ? this.setState({ classBlock: "display_none", arrow: "arrow" })
      : this.setState({ classBlock: "select", arrow: "arrow_down" });
  }

  handleBlur(event) {
    event.relatedTarget === null ||
    event.relatedTarget.className !== "active_chose"
      ? this.setState({ classBlock: "display_none", arrow: "arrow" })
      : this.setState({ value: event.relatedTarget.value });
  }
  render() {
    return (
      <div
        tabIndex="0"
        className="drop_down"
        onKeyDown={(event) =>
          event.code === "Enter" ? this.dropDown() : false
        }
        onClick={this.dropDown}
        onBlur={this.handleBlur}
      >
        <span> {this.state.value}</span>
        <span className={this.state.arrow}></span>
        <div tabIndex="0" className={this.state.classBlock}>
          {this.state.currency.map((item, id) => (
            <option
              tabIndex="0"
              key={id}
              value={item.symbol}
              className="active_chose"
            >
              {item.symbol} {item.label}
            </option>
          ))}
        </div>
      </div>
    );
  }
}
