import React from 'react';
import View from './View';
import { Product, loadProducts } from 'resources/product';

interface Props {
  categorySlug?: string
}

interface State {
  products: Product[];
  loading: boolean;
}

class ProductListController extends React.Component<Props> {
  state: State = { products: [], loading: true };
  async componentDidMount() {
    const products = await loadProducts();
    const loading = false;
    this.setState({ products, loading });
  }
  render() {
    return <View
      loading={this.state.loading}
      products={this.state.products} />
  }
}

export default ProductListController;