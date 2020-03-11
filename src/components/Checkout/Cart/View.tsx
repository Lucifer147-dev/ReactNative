import React from "react";
import classNames from "classnames";
import { HTMLTable, Classes } from "@blueprintjs/core";

import { CartState } from "store/cart/types"
import { Product, ProductOption } from "resources/product";
import { formatPrice, getTotal, getDiscount } from "utils/common";

import styles from "./Cart.module.scss";

interface CheckoutCartProps {
  cart: CartState;
}

const getFeature = (product: Product) => {
  if (!product.children) return "";
  const { options } = product;
  return <ul style={{ margin: 0, paddingLeft: 24 }} >{product.features.map(feature => {
    const selectedOption = feature.options.find(option => options.indexOf(option.id) > -1) as ProductOption;
    return (
      <li key={feature.id}>
        <span className={Classes.TEXT_MUTED}>{feature.name}:</span> {selectedOption.name}
      </li>
    )
  })}</ul>
}

const CheckoutCart: React.FC<CheckoutCartProps> = (props) => {
  const total = getTotal(props.cart);
  const discount = getDiscount(props.cart);
  return (
    <HTMLTable bordered>
      <thead>
        <tr>
          <th>Mặt hàng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props.cart.items).map(([_, item]) => (
          <tr key={item.product.slug}>
            <td>
              {item.product.name} <span className={Classes.TEXT_MUTED}>{
                item.product.unit && (item.product.unit)
              }</span> &times; {item.quantity}
              <div className={Classes.TEXT_SMALL}>{getFeature(item.product)}</div>
            </td>
            <td style={{ textAlign: "right" }}>
              <span className={Classes.TEXT_MUTED}>{formatPrice(item.product.price * item.quantity)}</span>
            </td>
          </tr>
        ))}
        {discount > 0 && <tr>
          <td colSpan={1}>
            <span>Mã giảm giá&nbsp;</span>
            <span className={classNames(styles.voucher, Classes.TEXT_MUTED)}>{props.cart.voucher}</span>
          </td>
          <td style={{ textAlign: "right" }}>
            <span className={Classes.TEXT_MUTED}>&minus;{formatPrice(discount)}</span>
          </td>
        </tr>}
        <tr>
          <td className={styles.total} colSpan={1}>Tổng cộng</td>
          <td className={styles.total}>{formatPrice(total)}</td>
        </tr>
      </tbody>
    </HTMLTable>
  );
}

export default CheckoutCart;
