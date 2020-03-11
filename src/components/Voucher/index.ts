import { connect } from "react-redux";

import { AppState } from "store";
import { addVoucher } from "store/cart/actions";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({ cart: state.cart });
export default connect(mapStateToProps, { addVoucher })(Controller);
