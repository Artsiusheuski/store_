import React, { PureComponent } from "react";
import client from "../../backend";
import { GET_PRODUCTS_BY_CATEGORY } from "../../backend/data";
import "./categories.css";
import ShowGoods from "./ShowGoods";

export default class PLP extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
    };
  }

  categoryPathHelp = () => {
    let index = window.location.pathname.lastIndexOf("/");
    let searchName = window.location.pathname;
    return searchName.substring(index + 1);
  };

  render() {
    client
      .query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: {
          input: {
            title: this.props.path ? this.props.path : this.categoryPathHelp(),
          },
        },
      })
      .then((result) => {
        if (result.loading) return null;
        if (result.error) return console.log(result.error);
        if (result.data.category === undefined) return null;
        else
          return this.setState({
            goods: result.data.category.products,
          });
      });
    return (
      <>
        <h1 className="wrapper_main_title">
          {this.props.path ? this.props.path : this.categoryPathHelp()}
        </h1>
        <ShowGoods goods={this.state.goods} pathname={this.props.path} />
      </>
    );
  }
}
