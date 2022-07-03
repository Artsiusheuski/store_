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
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Header></Header>
          <Routes>
            <Route exact path="/all" element={<All />} />
            <Route exact path="/" element={<All />} />
            <Route exact path="/clothes" element={<Clothes />} />
            <Route exact path="/tech" element={<Tech />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              exact
              path="/tech/:discriptionsgoods"
              element={<DiscriptionsGoods id={this.key} />}
            />
            <Route
              exact
              path="/clothes/:discriptionsgoods"
              element={<DiscriptionsGoods />}
            />
            <Route
              exact
              path="/all/:discriptionsgoods"
              element={<DiscriptionsGoods />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
