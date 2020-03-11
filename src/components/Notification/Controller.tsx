import React from "react";
import { CartState, CartItem } from "store/cart/types";
import { Toaster, Intent, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import styles from './styles.module.scss';
import { setCartItem } from "store/cart/actions";

interface Props {
  cart: CartState;
  setCartItem: typeof setCartItem;
}

class NotificationController extends React.Component<Props> {
  private toaster: Toaster = new Toaster();
  private refHandlers = {
    toaster: (ref: Toaster) => (this.toaster = ref),
  };

  handleRemoveCartItem = (oldCart: CartState, cart: CartState) => {
    const removedId = Object
      .keys(oldCart.items)
      .find(key => Object.keys(cart.items).indexOf(key) === -1) as string;
    const item = oldCart.items[Number(removedId)];

    this.toaster.show({
      intent: Intent.DANGER,
      icon: IconNames.INFO_SIGN,
      message: <div>Sản phẩm <span>{item.product.name}</span> vừa bị xóa</div>,
      action: {
        onClick: () => this.props.setCartItem(item),
        text: "Thêm lại",
      },
      className: styles.toast
    });
  }

  handleAddCartItem = (oldCart: CartState, cart: CartState) => {
    const latestItem = Object.values(cart.items).reduce((result, item) => {
      const itemTime = item.updatedAt || item.createdAt;
      const resultTime = result.updatedAt || result.createdAt;
      if (itemTime > resultTime) return item;
      return result;
    }, { createdAt: 0 } as CartItem);
    if (latestItem.createdAt === 0) return;
    if (latestItem.updatedAt) return;

    this.toaster.show({
      intent: Intent.SUCCESS,
      icon: IconNames.TICK,
      message: <div>Sản phẩm <span>{latestItem.product.name}</span> vừa được thêm vào giỏ hàng</div>,
      action: {
        href: "/cart",
        text: "Xem giỏ hàng"
      },
      className: styles.toast
    });
  }

  componentDidUpdate({ cart: oldCart }: Props) {
    const { cart } = this.props;
    if (oldCart !== cart) {
      console.log(oldCart);
      console.log(cart);
      console.log('OLD', Object.keys(oldCart.items).length);
      console.log('NEW', Object.keys(cart.items).length);
      if (Object.keys(oldCart.items).length > Object.keys(cart.items).length) {
        this.handleRemoveCartItem(oldCart, cart)
      } else {
        this.handleAddCartItem(oldCart, cart)
      }
    }
  }

  render() {
    return <Toaster className={styles.toaster} position={Position.TOP} ref={this.refHandlers.toaster} />;
  }
}

export default NotificationController;
