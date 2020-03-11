import { connect } from "react-redux";

import Controller from "./Controller";
import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  token: state.user.info ? state.user.info.token : "",
  phone: state.user.info ? state.user.info.phone : "",
});

export default connect(mapStateToProps)(Controller);
