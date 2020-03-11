import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Button, Classes } from "@blueprintjs/core";

import { CartItem } from "store/cart/types";
import { getFeature, formatPrice, getSubTotal } from "utils/common";
import ProductQuantity from "components/Product/Quantity"
import styles from "./styles.module.scss";

interface Props {
  item: CartItem;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
}

const CartItemView: React.FC<Props> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <tr className={styles["main"]}>
      <td className={styles["image"]}><img alt={item.product.name} src={item.product.images[0]} /></td>
      <td className={styles["name"]}>
        {item.product.name}
        {getFeature(item.product)}
      </td>

      <td className={styles["name-mobile"]}>
        <div>
          <span>{item.product.name} - </span>
          <span className={Classes.TEXT_MUTED}>{formatPrice(item.product.price)}</span>
        </div>
        <div style={{ marginBottom: 10 }} >{getFeature(item.product)}</div>
        <ProductQuantity minimal value={item.quantity} onChange={onQuantityChange} />
      </td>


      <td className={styles["price"]}>{formatPrice(item.product.price)}</td>
      <td className={styles["quantity"]}>
        <div className={styles["content"]}>
          <ProductQuantity minimal value={item.quantity} onChange={onQuantityChange} />
        </div>
      </td>
      <td className={styles["sub-total"]}>
        <span className={Classes.TEXT_MUTED}>{formatPrice(getSubTotal(item))}</span>
      </td>
      <td className={styles["action"]}>
        <Button minimal icon={IconNames.TRASH} onClick={onRemove} />
      </td>
    </tr>
  );
};

export default CartItemView;
