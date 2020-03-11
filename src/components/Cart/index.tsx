import React from 'react';

import Panel from "components/Panel";
import ProductList from "components/Product/List";
import CartList from "./List";
import styles from "./styles.module.scss";

const CartView: React.FC = () => {
  return (
    <div className={styles.main}>
      <Panel center title="Giỏ hàng" content={<CartList />} />
      <Panel center title="Có thể bạn quan tâm" content={<ProductList />} />
    </div>
  )
}

export default CartView;
