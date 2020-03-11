import { connect } from "react-redux";

import Controller from "./Controller";
import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Controller);
