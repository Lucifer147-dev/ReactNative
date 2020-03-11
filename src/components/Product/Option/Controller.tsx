import React from "react";
import { ProductFeature } from "resources/product";
import View from "./View";

interface Props {
  selected: number;
  feature: ProductFeature;
  onChange: (selected: number) => void;
}

class ProductOptionController extends React.Component<Props> {
  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const selected = Number(event.currentTarget.value);
    this.props.onChange(selected);
  }
  render() {
    return <View
      feature={this.props.feature}
      selected={this.props.selected}
      onChange={this.onChange}
    />
  }
}

export default ProductOptionController;
