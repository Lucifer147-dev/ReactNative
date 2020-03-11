import React from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import { AnchorButton, Classes } from "@blueprintjs/core";

import { PriceFormat, formatPrice } from "utils/common";
import { Product } from "resources/product";

import Skeleton from "components/Skeleton";
import Badge from "components/Badge";

import styles from "./_styles.module.scss";

interface Props {
  product?: Product;
}

const ProductListItem: React.FC<Props> = (props) => {
  const { product } = props;

  if (!product) return (
    <div className={classNames(styles.main, styles.skeleton)}>
      <div className={styles.imageContainer} style={{ marginBottom: 8 }}><Skeleton square /></div>
      <Skeleton width={80} align="center" count={2} />
    </div>
  );
  const badge = product.badges && product.badges.length && product.badges[0];
  return (
    <div className={classNames({
      [styles.main]: true,
      [styles.feature]: product.is_feature,
    })}>
      <AnchorButton
        minimal
        className={styles.button}
        href={`/shop/${product.category.slug}/${product.slug}`}
      >
        <div className={styles.product}>
          <div className={styles.top}>
            {product.is_feature && badge &&
              <div className={styles.feature}>
                <Badge slug={badge.slug} />
                <ReactMarkdown className={classNames(styles.text, Classes.RUNNING_TEXT)} source={badge.description}/>
              </div>
            }
            <div className={styles.imageContainer}>
              <img className={styles.image} alt={product.name} src={product.images[0]} />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>
              <div className={styles.name}>{product.name}</div>
              {product.code && <div className={classNames(Classes.TEXT_MUTED, styles.code)}>({product.code})</div>}
            </div>
            <div className={styles.price}>{formatPrice(product.price, PriceFormat.FULL)}</div>
          </div>
        </div>
      </AnchorButton>
    </div>
  );
}

export default ProductListItem;
