import { connect } from "react-redux";

import { AppState } from "store";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({
  token: state.user.info ? state.user.info.token : ''
});

export default connect(mapStateToProps)(Controller);
