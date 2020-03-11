import React from "react";
import { Product, loadProducts } from "resources/product";
import { AnchorButton } from "@blueprintjs/core";
import Price from "components/Product/Price";

import styles from "./Tree.module.scss";

interface ProductProps { }

interface ProductState {
  products: Product[];
}

class ProductTree extends React.Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = { products: [] };
  }
  async componentDidMount() {
    const products = await loadProducts();
    this.setState({ products });
  }
  onGrindChange(event: React.FormEvent<HTMLInputElement>) {
    console.log(event);
  }
  render() {
    const { products } = this.state;
    return (
      <div className={styles.main}>
        {products.map(product => <AnchorButton minimal key={product.slug}>
          <div className={styles.item}>
            <img className={styles.image} src={product.images[0]} />
            <div className={styles.info}>
              <div className={styles.title}>{product.name}</div>
              <Price price={product.price} />
            </div>
          </div>
        </AnchorButton>)}
      </div>
    )
  }
}

export default ProductTree;
