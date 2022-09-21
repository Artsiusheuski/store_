import React, { PureComponent } from "react";
import client from "../../../backend";
import { GET_PRODUCT_ID } from "../../../backend/data";
import FormGoods from "./FormGoods";

export default class PDP extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      goodsAttributes: [],
      goodsGallery: [],
      goodsGalleryBig: "",
      goodsPrices: [],
      goodsDiscriptions: {},
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
        if (result.loading) return null;
        if (result.error) return console.log(result.error);
        if (result.data.product === undefined) return null;
        else
          return (
            this.setState({
              goodsDiscriptions: {
                name: result.data.product.name,
                brand: result.data.product.brand,
              },
              goodsGallery: result.data.product.gallery,
              goodsGalleryBig: result.data.product.gallery[0],
              goodsAttributes: result.data.product.attributes,
              goodsPrices: result.data.product.prices,
              goods: result.data.product,
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
        <div className="goods_descriptions_img">
          {this.state.goodsGallery.map((item, index) => (
            <img
              onClick={this.imageSwitcher}
              key={index}
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
            <div className="wrapper_goods_descriptions_title">
              <h2>{this.state.goodsDiscriptions.name}</h2>
              <span>{this.state.goodsDiscriptions.brand}</span>
            </div>
            <FormGoods
              goodsAttributes={this.state.goodsAttributes}
              goodsPrices={this.state.goodsPrices} //+symbol
              goods={this.state.goods}
            />
          </div>
          <div ref={this.getElement} className="text_description_html"></div>
        </div>
      </section>
    );
  }
}
