import React from "react";

import { CartState } from "store/cart/types";
import View from './View'


interface Props {
  cart: CartState;
}

class MobileCartButtonController extends React.Component<Props> {
  render() {
    return <View cart={this.props.cart} />
  }
}

export default MobileCartButtonController;