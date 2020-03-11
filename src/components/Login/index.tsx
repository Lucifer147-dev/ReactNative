import { connect } from "react-redux";

import { AppState } from "store";
import { login, logout } from "store/user/actions";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login, logout })(Controller);
