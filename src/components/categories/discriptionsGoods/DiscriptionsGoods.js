import React from "react";
import { Component } from "react";
import client from "../../data";
import { GET_PRODUCT_ID } from "../../data/data";
import "./discriptionsGoods.css";

export default class DiscriptionsGoods extends Component {
  constructor() {
    super();
    this.state = {
      //name,                     count+
      //brand                              FOTO-1
      //symbol/amount                 1
      //Attributes/size
      //color                         count-
      goodsAttributes: [],
      goodsGallery: [],
      goodsPrices: [],
      goodsDiscription: ``,
      colorActive: "",
      itemsActive: "",
    };
    this.getAttributes = this.getAttributes.bind(this);
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
      .then((result) =>
        this.setState({
          goodsGallery: result.data.product.gallery,
          goodsAttributes: result.data.product.attributes,
          goodsPrices: result.data.product.prices.find(
            (item) => item.currency.symbol === "$" //get from redux/
          ).amount,
          goodsDiscription: result.data.product.description,
        })
      );
  }
  getAttributes(event) {
    event.preventDefault();
    if (event.target.id.includes("#")) {
      this.setState({
        colorActive: "colorActive",
      });
    } else {
      this.setState({
        itemsActive: "itemsActive",
      });
    }
    // console.log(event.target.id);
  }

  render() {
    return (
      <section className="wrapper_goods_descriptions">
        <div className="goods_descriptions_img">
          {this.state.goodsGallery.map((item, id) => (
            <img key={id} src={item} alt="imgGoods" />
          ))}
        </div>
        {console.log(this.state.goodsDiscription)}
        <div className="goods_descriptions_bigImg">
          <img src={this.state.goodsGallery[0]} alt="img" />
        </div>
        <div className="goods_descriptions_order">
          <div>
            <h2>NameGoods</h2>
            <span>NamesBrend</span>
          </div>

          {this.state.goodsAttributes.map((item, index) => (
            <div className="goods_descriptions_check" key={index}>
              <label className="goods_descriptions_check_label">
                {item.id}:
              </label>
              <div className="goods_descriptions_check_box">
                {item.items.map((item) => (
                  <span
                    onClick={this.getAttributes}
                    className={
                      item.value.includes("#")
                        ? `goods_descriptions_check_color ${this.state.colorActive}`
                        : `goods_descriptions_check_items ${this.state.itemsActive}`
                    }
                    id={item.value}
                    key={item.id}
                    style={{
                      backgroundColor: item.value,
                    }}
                  >
                    {item.value.includes("#") ? "" : item.value}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="goods_descriptions_check_down">
            <h4>Price:</h4>
            <span>$ {this.state.goodsPrices}</span>
            {/* needed get to symbol for amount */}
            <button className="goods_descriptions_btn" type="submit">
              ADD TO CART
            </button>
            <div className="text">{this.state.goodsDiscription}</div>
          </div>
        </div>
      </section>
    );
  }
}
