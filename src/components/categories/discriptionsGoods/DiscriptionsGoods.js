import React from "react";
import { Component } from "react";
import client from "../../data";
import { GET_PRODUCT_ID } from "../../data/data";
import "./discriptionsGoods.css";
import FormGoods from "./FormGoods";

export default class DiscriptionsGoods extends Component {
  constructor() {
    super();

    this.state = {
      goodsAttributes: [],
      goodsGallery: [],
      goodsGalleryBig: "",
      goodsPrices: [],
      goodsName: "",
      goodsBrand: "",
    };

    this.imageSwitcher = this.imageSwitcher.bind(this);
    this.getElement = React.createRef();
  }

  idGoods() {
    let index = window.location.pathname.lastIndexOf("/");
    let searchName = window.location.pathname;
    return searchName.substring(index + 1);
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCT_ID,
        variables: {
          id: this.idGoods(),
        },
      })
      .then((result) => {
        return (
          this.setState({
            goodsName: result.data.product.name,
            goodsBrand: result.data.product.brand,
            goodsGallery: result.data.product.gallery,
            goodsGalleryBig: result.data.product.gallery[0],
            goodsAttributes: result.data.product.attributes,
            goodsPrices: result.data.product.prices.find(
              (item) => item.currency.symbol === "$" //get from redux/
            ).amount,
          }),
          this.getElement.current.insertAdjacentHTML(
            "afterbegin",
            result.data.product.description
          )
        );
      });
  }

  imageSwitcher(event) {
    this.setState({ goodsGalleryBig: event.target.src });
  }

  render() {
    return (
      <section className="wrapper_goods_descriptions">
        {console.log(this.state.goodsParams)}
        <div className="goods_descriptions_img">
          {this.state.goodsGallery.map((item, id) => (
            <img
              onClick={this.imageSwitcher}
              key={id}
              src={item}
              alt="imgGoods"
            />
          ))}
        </div>
        <div className="goods_descriptions_bigImg">
          <img src={this.state.goodsGalleryBig} alt="img" />
        </div>
        <div className="goods_descriptions_order">
          <div>
            <h2>{this.state.goodsName}</h2>
            <span>{this.state.goodsBrand}</span>
          </div>
          <FormGoods
            goodsAttributes={this.state.goodsAttributes}
            goodsPrices={this.state.goodsPrices}
            nameGood={this.idGoods()}
          />
          <div ref={this.getElement} className="text_description_html"></div>
        </div>
      </section>
    );
  }
}
