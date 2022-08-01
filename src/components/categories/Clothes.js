import { React, Component } from "react";
import client from "../data";
import { GET_PRODUCTS_BY_CATEGORY } from "../data/data";
import "./categories.css";
import ViewGoods from "./ViewGoods";

export default class Clotheth extends Component {
  constructor() {
    super();
    this.state = {
      nameСategory: "",
      goods: [],
    };
  }

  nameCategory() {
    let index = window.location.pathname.lastIndexOf("/");
    let searchName = window.location.pathname;

    return searchName.substring(index + 1);
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { input: { title: this.nameCategory() } },
      })
      .then((result) =>
        this.setState({
          nameСategory: this.nameCategory(),
          goods: result.data.category.products,
        })
      );
  }

  render() {
    return (
      <>
        <h1 className="wrapper_main_title">{this.state.nameСategory}</h1>
        <ViewGoods goods={this.state.goods} />
      </>
    );
  }
}
