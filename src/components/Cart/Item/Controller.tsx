import React from "react";

import { CartItem } from "store/cart/types";
import { setCartItem, deleteCartItem } from "store/cart/actions";
import View from "./View";

interface Props {
  item: CartItem;
  setCartItem: typeof setCartItem;
  deleteCartItem: typeof deleteCartItem;
}

class CartItemController extends React.Component<Props> {
  onRemove = () => this.props.deleteCartItem(this.props.item);
  onQuantityChange = (quantity: number) =>
    this.props.setCartItem({ ...this.props.item, quantity })
  render() {
    return <View
      item={this.props.item}
      onRemove={this.onRemove}
      onQuantityChange={this.onQuantityChange}
    />
  }
}

export default CartItemController;
