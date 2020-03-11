import React from "react";
import Media from "react-media";
import classNames from "classnames";

import { IconNames } from "@blueprintjs/icons";
import { Button, Classes, Intent, Dialog } from "@blueprintjs/core";

import { PTClasses } from "utils/common";
import { Product } from "resources/product";
import Panel from "components/Panel";
import Price from "components/Product/Price";
import Skeleton from "components/Skeleton";
import Quantity from "components/Product/Quantity";
import ProductOption from "components/Product/Option";
import ProductList from "components/Product/List";
import Promotion from 'components/Product/Promotion';

import styles from "./Detail.module.scss";
import ReactMarkdown from "react-markdown";

interface ProductDetailViewProps {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
  onOpenDialog: () => void;

  product?: Product;
  addToCart: () => void;
  applyPromotion: (code: string) => void;
  selected: {
    [featureId: number]: number
  };
  onChange: (featureId: number, selected: number) => void;
  quantity: number;
  changeQuantity: (quantity: number) => void;
  features: Product['features'];
}

const SkeletonProductDetailView = () => (
  <div className={styles.product}>
    <div className={styles.image}><Skeleton square /></div>
    <div className={styles.info}>
      <Skeleton width={40} />
      <Skeleton width={20} />
      <Skeleton width={100} count={10} />
      <Skeleton width={30} count={1} />
      <Skeleton width={30} count={1} />
    </div>
  </div>
)

const ProductDetailView: React.FC<ProductDetailViewProps> = (props) => {
  const { product } = props;
  if (!product) return <SkeletonProductDetailView />
  const productAction = (<div>
    {props.features.map(feature =>
      <ProductOption
        key={feature.id}
        feature={feature}
        selected={props.selected[feature.id]}
        onChange={selected => props.onChange(feature.id, selected)}
      />
    )}
    <div>
      <Quantity value={props.quantity} onChange={props.changeQuantity} />
      <Button className={classNames(Classes.DIALOG_CLOSE_BUTTON, PTClasses.CallToAction)} onClick={() => {
        props.addToCart();
        props.onCloseDialog();
      }} icon={IconNames.OFFLINE} intent={Intent.PRIMARY} large text={"Mua ngay"} />
    </div>
  </div>);

  return (
    <div className={styles.main}>
      <div className={`${styles.product} ${Classes.LARGE}`}>
        <img
          alt={product.name}
          className={styles.image}
          src={product.images[0]}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>
            <Price price={product.price} originalPrice={product.original_price} />
          </div>

          {product.vouchers && product.vouchers.map(voucher =>
            voucher.is_visible &&
            <Promotion key={voucher.id} voucher={voucher} product={product} onApply={props.applyPromotion} />
          )}

          {product.is_available === false ? (
            <div className={Classes.INTENT_DANGER}>Rất tiếc, sản phẩm đang tạm hết hàng!</div>
          ) :
            <Media query={{ maxWidth: 700 }}>
              {(isPhone: boolean) => isPhone
                ? (
                  <div className={styles["mobile-cta"]}>
                    <Dialog
                      isOpen={props.isDialogOpen}
                      onClose={props.onCloseDialog}
                      className={styles["dialog"]}
                    ><div className={classNames(styles["dialog-body"])}>{productAction}</div></Dialog>
                    <Button className={PTClasses.CallToAction} onClick={props.onOpenDialog} icon={IconNames.OFFLINE} intent={Intent.PRIMARY} large text={"Mua ngay"} />
                  </div>
                )
                : productAction
              }
            </Media>}

          <div className={`${styles.description} ${Classes.RUNNING_TEXT}`}>
            <ReactMarkdown source={product.description} />
          </div>
        </div>
      </div>
      <Panel
        small center
        title="Có thể bạn quan tâm"
        content={<ProductList />}
      />
    </div>
  );
}

export default ProductDetailView;
