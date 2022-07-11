import { React, Component } from "react";
import client from "../data";
import { ALL_CATEGORY_SECTION } from "../data/data";
import "./categories.css";
import ViewGoods from "./ViewGoods";

export default class All extends Component {
  constructor() {
    super();
    this.state = {
      nameCategory: "",
      goods: [],
      symbol: "",
    };
  }

  componentDidMount() {
    client
      .query({
        query: ALL_CATEGORY_SECTION,
      })
      .then((result) =>
        this.setState({
          nameCategory: result.data.category,
          goods: result.data.category.products,
          symbol: result.data.category.products[0].prices[0].currency.symbol, //need to get from storage and currency selection
        })
      );
  }

  render() {
    return (
      <>
        <h1 className="wrapper_main_title">{this.state.nameCategory.name}</h1>
        <ViewGoods goods={this.state.goods} symbol={this.state.symbol} />
      </>
    );
  }
}
