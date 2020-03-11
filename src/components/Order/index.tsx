import { connect } from "react-redux";

import { AppState } from "store";
import Controller from "./Controller";
import { User } from "resources/user";

const mapStateToProps = (state: AppState) => ({
  token: (state.user.info as User).token
});

export default connect(mapStateToProps)(Controller);
