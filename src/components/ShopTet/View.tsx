import React from "react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import { Classes } from "@blueprintjs/core";

import { ProductCollection } from "resources/product";
import Item from "components/Product/Item";
import styles from "./styles.module.scss";

interface Props {
  collections?: ProductCollection[];
}

const ShopView: React.FC<Props> = (props) => {
  return (
    <div className={styles.main}>
      {props.collections === undefined
        ? (
          <div className={styles.collection}>{Array(8).fill(null).map((_, index) =>
            <div key={`skeleton-${index}`} className={styles.item}><Item /></div>)}
          </div>
        )
        : props.collections.map((collection, index) =>
          <div key={collection.id} className={styles.collection}>
            {collection.name && <div className={classNames(styles.info, Classes.RUNNING_TEXT, Classes.TEXT_LARGE)}>
              {/* <h1>{collection.name}</h1> */}
              <ReactMarkdown className={styles.description} source={collection.description} />
            </div>}
            {collection.products && collection.products.map(product =>
              <div key={product.id} className={classNames({
                [styles.item]: true,
                [styles.feature]: product.is_feature,
              })}>
                <Item product={product} />
              </div>
            )}
            <div className={styles.item} /><div className={styles.item} /><div className={styles.item} />
          </div>
        )}
    </div>
  );
}

export default ShopView;
