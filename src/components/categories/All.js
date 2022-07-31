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
        })
      );
  }

  render() {
    return (
      <>
        <h1 className="wrapper_main_title">{this.state.nameCategory.name}</h1>
        <ViewGoods goods={this.state.goods} />
      </>
    );
  }
}
