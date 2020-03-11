import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import About from "components/About";
import Header from "components/Header";
import Order from 'components/Order';
import Cart from "components/Cart";
import Checkout from "components/Checkout";
import ProdutDetail from "components/Product/Detail";
import Notification from "components/Notification";
import Document from "components/Document";

import styles from "./App.module.scss";
import Footer from "components/Footer";
import Shop from "components/Shop";
import ShopTet from "components/ShopTet";
import Media from "react-media";

const App: React.FC = () => {
  return (
    <div className={styles.main}>
      <Media query={{ maxWidth: 700 }}>
        {(isPhone: boolean) => isPhone && <Notification />}
      </Media>
      <BrowserRouter>
        <Header />
        <div className={styles.body}>
          <Route exact path="/" component={() => <Shop ids={[1, 2, 3]} />} />
          <Route exact path="/tet" component={() => <ShopTet ids={[4, 5, 6]} />} />
          <Route exact path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/doc/:slug" component={Document} />
          <Route path="/shop/:categorySlug/:productSlug" component={ProdutDetail} />
          <Route path="/order/:orderId" component={Order} />
        </div>
        <div className={styles.footer}><Footer /></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
