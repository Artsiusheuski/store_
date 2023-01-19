import React, { PureComponent } from "react";
import client from "../../backend";
import { GET_PRODUCTS_BY_CATEGORY } from "../../backend/data";
import ShowGoods from "./ShowGoods";
import FilterGoods from "./FilterGoods";

export default class PLP extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      filterGOODS: [],
    };

    this.getParamsGoodsURL = this.getParamsGoodsURL.bind(this);
    this.goodsFiltering = this.goodsFiltering.bind(this);
  }

  categoryPathHelp = () => {
    let index = window.location.pathname.lastIndexOf("/");
    let searchName = window.location.pathname;
    return searchName.substring(index + 1);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path)
      this.setState({
        filterGOODS: "",
      });
  }

  getParamsGoodsURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    let box = {};
    searchParams.forEach((value, key) => {
      box[key] = value;
    });
    this.setState({
      filterGOODS: box,
    });
  };

  goodsFiltering(allGoods, filterValues) {
    // filtering goods
    let goodsArray = [];
    if (allGoods.length > 0 && allGoods.length > 0)
      for (let i = 0; i < allGoods.length; i++) {
        for (let b = 0; b < allGoods[i].attributes.length; b++) {
          console.log(filterValues);
        }
      }
  }

  render() {
    window.onload = this.getParamsGoodsURL;

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
        <ShowGoods
          // goods={this.goodsFiltering(this.state.goods,this.state.filterGOODS )}
          goods={this.state.goods}
          pathname={this.props.path}
        />
        {console.log(
          this.goodsFiltering(this.state.goods, this.state.filterGOODS)
        )}
        <FilterGoods
          getParamsGoodsURL={this.getParamsGoodsURL}
          attributes={this.state.goods.map((item) =>
            item.attributes.map((i) => i)
          )}
        />
      </>
    );
  }
}
