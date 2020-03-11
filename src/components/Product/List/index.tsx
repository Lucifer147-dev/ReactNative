import { connect } from "react-redux";

import { AppState } from "store";
import Controller from "./Controller";

const mapStateToProps = (state: AppState) => ({
});

const ProductList = connect(mapStateToProps)(Controller);

export default ProductList;
