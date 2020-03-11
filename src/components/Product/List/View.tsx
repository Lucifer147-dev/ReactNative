import React from "react";

import { Product } from "resources/product";
import styles from "./_styles.module.scss";
import Item from "components/Product/Item";

interface Props {
  products: Product[];
  loading: boolean;
}

const ProductListView: React.FC<Props> = (props) => {
  return (
    <div className={styles.main}>
      {props.loading && Array(8).fill(null).map((_, index) =>
        <div key={`skeleton-${index}`} className={styles.item}><Item /></div>)}
      {props.products.map(product =>
        <div key={product.id} className={styles.item}>
          <Item product={product} />
        </div>
      )}
      <div className={styles.item} /><div className={styles.item} /><div className={styles.item} />
    </div>
  );
}

export default ProductListView;