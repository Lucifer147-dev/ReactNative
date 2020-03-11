import React from "react";
import { match } from "react-router";

import { Product, loadProduct, ProductOption } from "resources/product";
import { addCartItem, addVoucher } from "store/cart/actions";
import View from "./View";

interface Props {
  match: match<{productSlug: string}>;
  addVoucher: typeof addVoucher;
  addCartItem: typeof addCartItem;
}

interface State {
  product?: Product;
  selectedProduct?: Product;
  quantity: number;
  selected: {
    [id: number]: number;
  }
  features: Product['features'];
  isDialogOpen: boolean;
}

class ProductDetailController extends React.Component<Props> {
  state: State = { quantity: 1, selected: {}, features: [], isDialogOpen: false };

  async componentDidMount() {
    const product = await loadProduct(this.props.match.params.productSlug);
    if (!product.children) {
      this.setState({ product, selectedProduct: product });
      return;
    }
    const { options } = product.children.find(child => child.is_default) || product.children[1];
    const selected = product.features.reduce((result, feature) => ({
      ...result,
      [feature.id]:
        (feature.options.find(option => options.indexOf(option.id) > -1) as ProductOption).id
    }), {});
    const features = product.features.map(feature => {
      const options = feature.options.filter(option => product.children.find(
        product => product.options.indexOf(option.id) > -1
      ));
      return { ...feature, options }
    });
    this.setState({ product, selected, features });
  }

  componentDidUpdate(_: Props, oldState: State) {
    if (this.state.selected === oldState.selected) return;
    const selectedOptions = Object.values(this.state.selected);
    const selectedChild = (this.state.product as Product).children.find(
      product => selectedOptions.every(option => product.options.indexOf(option) > -1)
    ) as Product;
    const selectedProduct: Product = {
      ...(this.state.product as Product),
      ...selectedChild,
    };
    this.setState({ selectedProduct });
  }

  addToCart = () => {
    const product = this.state.selectedProduct as Product;
    const quantity = this.state.quantity;
    this.props.addCartItem({ product, quantity });
  }

  addVoucher = (code: string) => {
    const product = this.state.selectedProduct as Product;
    const quantity = this.state.quantity;
    this.props.addCartItem({ product, quantity });
    this.props.addVoucher(code);
  }

  onChange = (featureId: number, selectedValue: number) => {
    const selected = {
      ...this.state.selected,
      [featureId]: selectedValue,
    }
    this.setState({ selected });
  }

  changeQuantity = (quantity: number) => this.setState({ quantity });
  onOpenDialog = () => this.setState({ isDialogOpen: true });
  onCloseDialog = () => this.setState({ isDialogOpen: false });
  render() {
    return (
      <View
        isDialogOpen={this.state.isDialogOpen}
        onCloseDialog={this.onCloseDialog}
        onOpenDialog={this.onOpenDialog}

        features={this.state.features}
        product={this.state.selectedProduct}
        addToCart={this.addToCart}
        applyPromotion={this.addVoucher}

        onChange={this.onChange}
        selected={this.state.selected}

        quantity={this.state.quantity}
        changeQuantity={this.changeQuantity}
      />
    )
  }
}

export default ProductDetailController;
