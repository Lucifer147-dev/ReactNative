import { connect } from "react-redux";
import { AppState } from "store";
import View from "./View";

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(View);
