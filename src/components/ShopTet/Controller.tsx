import React from 'react';
import View from './View';
import { loadCollections, loadCollectionsByIds, ProductCollection } from 'resources/product';

interface Props {
  ids?: number[]
  categorySlug?: string
}

interface State {
  collections?: ProductCollection[];
}

class ShopController extends React.Component<Props> {
  state: State = {};
  async componentDidMount() {
    const collections = this.props.ids
      ? await loadCollectionsByIds(this.props.ids)
      : await loadCollections();
    collections.forEach(collection => {
      if (!collection.products) return;
      const featureIndex = collection.products.findIndex(product => product.is_feature);
      if (featureIndex > -1) {
        const swapIndex = collection.products.length > 4 ? 4 : 2;
        const temp = collection.products[swapIndex];
        collection.products[swapIndex] = collection.products[featureIndex];
        collection.products[featureIndex] = temp;
      }
    });
    this.setState({ collections });
  }
  render() {
    return <View collections={this.state.collections} />
  }
}

export default ShopController;
