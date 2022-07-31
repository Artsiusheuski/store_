import { React, Component } from "react";
import client from "../data";
import { GET_PRODUCTS_BY_CATEGORY } from "../data/data";
import "./categories.css";
import ViewGoods from "./ViewGoods";

export default class Tech extends Component {
  constructor() {
    super();
    this.state = {
      nameCategory: "",
      goods: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { input: { title: "tech" } },
      })
      .then((result) =>
        this.setState({
          nameCategory: "tech",
          goods: result.data.category.products,
        })
      );
  }

  render() {
    return (
      <>
        <h1 className="wrapper_main_title">{this.state.nameCategory}</h1>
        <ViewGoods goods={this.state.goods} />
      </>
    );
  }
}
