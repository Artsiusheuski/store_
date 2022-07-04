import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import All from "../components/categories/All";
import Clothes from "./categories/Clothes";
import Tech from "../components/categories/Tech";
import Cart from "./cart/Cart";
import DiscriptionsGoods from "./categories/discriptionsGoods/DiscriptionsGoods";
import Error from "./Error";

class App extends Component {
  match = {
    all: "/all",
    clothes: "/clothes",
    tech: "/tech",
  };
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Header></Header>
          <Routes>
            <Route exact path={this.match.all} element={<All />} />
            <Route exact path={this.match.clothes} element={<Clothes />} />
            <Route exact path={this.match.tech} element={<Tech />} />
            <Route path="/cart" element={<Cart />} />
            {Object.values(this.match).map((item, id) => (
              <Route
                key={id}
                path={item + "/:discriptionsgoods"}
                element={<DiscriptionsGoods />}
              />
            ))}

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
