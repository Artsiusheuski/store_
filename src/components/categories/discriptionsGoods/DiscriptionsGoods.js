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
      bigGoodsImg: "",
      goodsGallery: [],
      goodsPrices: [],
      goodsDiscription: ``,
    };

    this.getAttributes = this.getAttributes.bind(this);
    this.imageSwitcher = this.imageSwitcher.bind(this);
    this.nameCheck = React.createRef();
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
          bigGoodsImg: result.data.product.gallery[0],
          goodsGallery: result.data.product.gallery,
          goodsAttributes: [...result.data.product.attributes],
          goodsPrices: result.data.product.prices.find(
            (item) => item.currency.symbol === "$" //get from redux/
          ).amount,
          goodsDiscription: result.data.product.description,
        })
      );
  }
  componentDidUpdate() {
    this.textHTML = document.querySelector(".text_description_html");
    this.textHTML.insertAdjacentHTML("afterbegin", this.state.goodsDiscription);
  }

  getAttributes(event) {
    console.log();
  }
  imageSwitcher(event) {
    this.setState({ bigGoodsImg: event.target.src });
  }

  render() {
    return (
      <section className="wrapper_goods_descriptions">
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
        {/* {console.log(this.state.goodsDiscription)} */}
        <div className="goods_descriptions_bigImg">
          <img src={this.state.bigGoodsImg} alt="img" />
        </div>
        <div className="goods_descriptions_order">
          <div>
            <h2>NameGoods</h2>
            <span>NamesBrend</span>
          </div>
          {this.state.goodsAttributes.map((item, index) => (
            <form
              onChange={this.getAttributes}
              className="goods_descriptions_check"
              key={index}
            >
              <p id={item.id} className="goods_descriptions_check_label">
                {item.name} :
              </p>
              <div
                ref={this.nameCheck}
                className="goods_descriptions_check_box"
              >
                {item.items.map((item, index) => (
                  <label id="lb" key={index}>
                    <input
                      className={
                        item.value.includes("#")
                          ? "goods_descriptions_check_color"
                          : "goods_descriptions_check_items"
                      }
                      name="text"
                      type="radio"
                      value={item.value}
                      style={{
                        backgroundColor: item.value.includes("#")
                          ? item.value
                          : "",
                      }}
                    />
                    <span>{!item.value.includes("#") && item.value}</span>
                  </label>
                ))}
              </div>
            </form>
          ))}

          <div className="goods_descriptions_check_down">
            <h4>Price:</h4>
            <span>$ {this.state.goodsPrices}</span>
            {/* needed get to symbol for amount */}
            <button className="goods_descriptions_btn" type="submit">
              ADD TO CART
            </button>
            <div className="text_description_html"></div>
          </div>
        </div>
      </section>
    );
  }
}
