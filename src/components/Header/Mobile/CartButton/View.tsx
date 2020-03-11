import React from 'react';
import { CartState } from 'store/cart/types';

import { AnchorButton, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { countCartItems } from 'utils/common';

import styles from "./styles.module.scss";

interface Props {
  cart: CartState;
}

const MobileCartButtonView: React.FC<Props> = ({ cart }) => {
  const count = countCartItems(cart)
  return (
    <AnchorButton
      fill
      minimal large
      href="/cart"
      className={styles["button"]}
      text={
      <div className={styles.content}>
        <Icon iconSize={20} icon={IconNames.SHOPPING_CART} />
        {count > 0 && <div className={styles["count"]}>{count}</div>}
      </div>}
    />
  )
}

export default MobileCartButtonView;