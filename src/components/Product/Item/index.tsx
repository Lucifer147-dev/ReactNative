import { connect } from "react-redux";

import { AppState } from "store";
import View from "./View";

const mapStateToProps = (state: AppState) => ({});

export default connect(mapStateToProps)(View);
