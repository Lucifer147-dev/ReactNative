import { connect } from "react-redux";

import { setCartItem, deleteCartItem } from "store/cart/actions";
import { AppState } from "store";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { setCartItem, deleteCartItem })(Controller);
