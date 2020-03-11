import { connect } from "react-redux";

import Controller from "./Controller";
import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps)(Controller);
