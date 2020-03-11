import React from "react";
import { connect } from "react-redux";
import { CartState, CartItem } from "store/cart/types"
import { AnchorButton, Tag, Intent, Popover, PopoverInteractionKind, ControlGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppState } from "store";
import styles from "./CartMenu.module.scss";
import CheckoutCart from "components/Checkout/Cart/View";
import { PTClasses } from "utils/common";

interface CartMenuProps {
  cart: CartState;
}

function countItems(cart: CartState) {
  return Object.values(cart.items).reduce((total, item) => total + item.quantity, 0);
}

interface CartMenuState {
  notify?: boolean;
}

class CartMenu extends React.Component<CartMenuProps> {
  state: CartMenuState = {};

  getLatestItem = (cart: CartState) => {
    const latestItem = Object.values(cart.items).reduce((result, item) => {
      const itemTime = item.updatedAt || item.createdAt;
      const resultTime = result.updatedAt || result.createdAt;
      if (itemTime > resultTime) return item;
      return result;
    }, { createdAt: 0 } as CartItem);
    if (latestItem.createdAt === 0) return;
    return latestItem;
  }

  componentDidUpdate({ cart: oldCart }: CartMenuProps, old: CartMenuState) {
    const { cart } = this.props;
    if (Object.keys(oldCart.items).length <= Object.keys(cart.items).length) {
      const latestItemOld = this.getLatestItem(oldCart);
      const latestItem = this.getLatestItem(cart);

      if (latestItem && latestItemOld && latestItemOld.product.id === latestItem.product.id) return;
      if (latestItem && latestItem.updatedAt) return;
    }

    if (this.state.notify !== old.notify) return;
    if (!this.state.notify) {
      this.setState({ notify: true });
      setTimeout(() => {
        this.setState({ notify: false });
        this.setState({ notify: undefined });
      }, 5000);
    }
  }
  getMessage = () => {
    const latestItem = Object.values(this.props.cart).reduce((result, item) => {
      if (item.createdAt > result.createdAt) {
        return item
      }
      return result
    }, { createdAt: 0 } as CartItem);
    if (!latestItem.product) return "";
    if (latestItem.updatedAt) return "";
    return (
      <div className={styles.notify}>
        <p style={{ fontSize: 14 }}>Sản phẩm {latestItem.product.name} vừa được thêm vào giỏ hàng.</p>
        {/* <AnchorButton href={"/checkout"} fill intent={Intent.PRIMARY}>Thanh toán ngay</AnchorButton> */}
      </div>
    );
  }
  render() {
    const count = countItems(this.props.cart);
    return (
      <Popover isOpen={this.state.notify && this.state.notify} interactionKind={PopoverInteractionKind.HOVER}>
        <AnchorButton rightIcon={IconNames.CHEVRON_DOWN} icon={IconNames.SHOPPING_CART} text={"Giỏ hàng"} minimal>
          {count > 0 ? <Tag className={styles.tag} intent={Intent.PRIMARY} round>{count}</Tag> : null}
        </AnchorButton>
        <div className={styles.content}>
          {count > 0 ?
            <div>
              <ControlGroup fill style={{ padding: 10 }}>
                <AnchorButton className={PTClasses.CallToAction} fill href="/cart" large text={"Xem giỏ hàng"} />
              </ControlGroup>
              <CheckoutCart cart={this.props.cart} />
            </div> :
            <div style={{ padding: 10 }}>
              <div>Bạn chưa có sản phẩm nào trong giỏ hàng</div>
              <AnchorButton className={PTClasses.CallToAction} href="/" style={{ marginTop: 8 }} fill text="Tiếp tục mua sắm" />
            </div>
          }
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartMenu);
