import React from 'react';
import classNames from 'classnames';
import { Button, Intent, Callout } from '@blueprintjs/core';

import { Product } from 'resources/product';
import { Voucher, VoucherType } from 'resources/voucher';
import { formatPrice, formatPercentage, PTClasses } from 'utils/common';

import styles from './styles.module.scss';
import { IconNames } from '@blueprintjs/icons';

interface PromotionProps {
  voucher: Voucher;
  product: Product;
  onApply: (code: string) => void;
}

const Promotion: React.FC<PromotionProps> = (props) => {
  const { voucher } = props;
  const amount = voucher.type === VoucherType.ABSOLUTE
    ? formatPrice(voucher.value)
    : formatPercentage(voucher.value)
  return (
    <Callout className={styles.main}>
      <div className={styles.text}>
        <span>Giảm ngay {amount} khi áp dụng mã giảm giá </span>
        <span className={styles.code}>{voucher.code}</span>
      </div>
      <Button
        className={classNames(styles.button, PTClasses.CallToAction)}
        intent={Intent.NONE} icon={IconNames.OFFLINE} text="Áp dụng ngay"
        onClick={() => props.onApply(voucher.code)} />
    </Callout>
  )
}

export default Promotion;
