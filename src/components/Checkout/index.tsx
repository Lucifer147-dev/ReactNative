import { connect } from "react-redux";

import { AppState } from "store";
import { emptyCart } from "store/cart/actions";
import { User } from "resources/user";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({
  user: state.user.info as User,
  cart: state.cart,
});

export default connect(mapStateToProps, { emptyCart })(Controller);
