import React from "react";
import { formatPrice, PriceFormat } from "utils/common";
import styles from "./Price.module.scss";
import { Classes} from "@blueprintjs/core";

export interface ProductPriceProps {
  price: number;
  originalPrice?: number;
}

function getDiscount(current: number, original: number) {
  return formatPrice(original - current, PriceFormat.FULL);
}

const ProductPrice: React.FC<ProductPriceProps> = (props: ProductPriceProps) => {
  return (
    <div className={styles.main}>
      <span className={styles.price}>{formatPrice(props.price)}</span>
      {props.originalPrice && props.originalPrice > props.price && ([
        <span className={`${styles.original} ${Classes.TEXT_DISABLED}`}>{formatPrice(props.originalPrice)}</span>,
        <span className={styles.discount}>
          tiết kiệm {getDiscount(props.price, props.originalPrice)}
        </span>
      ])}
    </div>
  );
}

export default ProductPrice;
