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
    if (prevProps.path !== this.props.path) {
      this.setState({
        filterGOODS: "",
      });
    }
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
    let goodsArray = [];
    let getGoods = [];
    allGoods.map((item) =>
      goodsArray.push([
        item.id,
        item.attributes.map((i) => {
          return i.name;
        }),
        item.attributes.map((i) => {
          return i.items.map((it) => it.value);
        }),
      ])
    );

    for (let key = 0; key < goodsArray.length; key++) {
      let goodsFilter = {};
      if (goodsArray[key][1].length > 0) {
        for (let n = 0; n < goodsArray[key][1].length; n++) {
          for (let g = 0; g < Object.entries(filterValues).length; g++) {
            if (goodsArray[key][1][n] === Object.entries(filterValues)[g][0]) {
              if (
                goodsArray[key][2][n].includes(
                  Object.entries(filterValues)[g][1]
                )
              ) {
                goodsFilter = allGoods.filter(
                  (id) => id.id === goodsArray[key][0]
                );
                getGoods.push(...goodsFilter);
              }
            }
          }
        }
      }
    }

    return Object.entries(filterValues).length > 0
      ? [...new Set(getGoods)]
      : allGoods;
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
          goods={this.goodsFiltering(this.state.goods, this.state.filterGOODS)}
          pathname={this.props.path}
        />
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
