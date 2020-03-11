import { connect } from "react-redux";

import { addCartItem, addVoucher } from "store/cart/actions";
import Controller from "./Controller";

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { addCartItem, addVoucher })(Controller);