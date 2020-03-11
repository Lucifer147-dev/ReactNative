import React from "react";

import { CartState } from "store/cart/types";
import View from "./View";

interface Props {
  cart: CartState;
}

const CartListController : React.FC<Props> = (props) => {
  return <View cart={props.cart} />
}

export default CartListController;
