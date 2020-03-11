import React from "react";
import classNames from "classnames";
import { IconNames } from "@blueprintjs/icons";
import { Classes } from "@blueprintjs/core/lib/esm/common";
import { HTMLTable, AnchorButton } from "@blueprintjs/core";

import Item from "components/Cart/Item";
import Voucher from "components/Voucher";
import { CartState } from "store/cart/types";
import { formatPrice, PTClasses, getTotal, getDiscount } from "utils/common";

import styles from "./styles.module.scss";

interface Props {
  cart: CartState;
};

const CartListView: React.FC<Props> = ({ cart }) => {
  const items = Object.values(cart.items);
  if (items.length === 0) return (
    <div className={classNames(styles.content, Classes.TEXT_LARGE)}>Giỏ hàng của bạn chưa có sản phẩm nào.</div>
  );

  const discount = getDiscount(cart);

  const rightAlignStyle: React.CSSProperties = { textAlign: "right" };
  const centerAlignStyle: React.CSSProperties = { textAlign: "center" };
  return (
    <div className={styles.content}>
      <HTMLTable bordered className={styles.main}>
        <thead className={styles.thead}>
          <tr>
            <th />
            <th>Sản phẩm</th>
            <th className={styles.price} style={centerAlignStyle}>Giá bán</th>
            <th className={styles.quantity} style={centerAlignStyle}>Số lượng</th>
            <th className={styles.subTotal} style={rightAlignStyle}>Thành tiền</th>
            <th className={styles.action} />
          </tr>
        </thead>
        <tbody>
          {items.map((item) =>
            <Item
              key={item.product.id}
              item={item}
            />
          )}
          {discount > 0 && [
            <tr key="total" className={styles.total}>
              <td style={rightAlignStyle} colSpan={4}>
                <span>Mã giảm giá&nbsp;</span>
                <span className={classNames(Classes.TEXT_MUTED, styles.voucher)}>{cart.voucher}</span>
              </td>
              <td style={rightAlignStyle}>&minus;{formatPrice(discount)}</td>
              <td />
            </tr>,
            <tr key="total-mobile" className={styles.totalMobile}>
              <td style={centerAlignStyle} colSpan={3}>
                <span>Mã giảm giá </span>
                <span className={classNames(Classes.TEXT_MUTED, styles.voucher)}>{cart.voucher}</span>
                <div>&minus;{formatPrice(discount)}</div>
              </td>
            </tr>
          ]}
          <tr className={styles.total}>
            <td style={rightAlignStyle} colSpan={4}>Tổng cộng</td>
            <td style={rightAlignStyle}><strong>{formatPrice(getTotal(cart))}</strong></td>
            <td />
          </tr>
          <tr className={styles.totalMobile}>
            <td colSpan={3} style={centerAlignStyle}>Tổng cộng: <strong>{formatPrice(getTotal(cart))}</strong></td>
          </tr>
          <tr className={styles.totalMobile}><td colSpan={3} /></tr>
        </tbody>
      </HTMLTable>
      <Voucher />
      <AnchorButton
        className={classNames(styles.checkoutButton, PTClasses.CallToAction)}
        large href="/checkout" text="Bấm để đặt hàng ngay" rightIcon={IconNames.OFFLINE}
      />
    </div>
  )
}

export default CartListView;
