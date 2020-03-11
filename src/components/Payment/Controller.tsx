import React from "react";

import View from "./View";
import { PaymentMethod, PaymentOption, computePaymentOptions } from 'resources/payment';
import { CartState } from "store/cart/types";

interface Props {
  onChange: (selected: PaymentMethod) => void;
  cart: CartState;
}

interface State {
  selected: PaymentMethod;
  options: PaymentOption[];
}

class PaymentController extends React.Component<Props> {
  state: State = {
    selected: PaymentMethod.COD,
    options: [],
  };
  componentDidMount() {
    this.props.onChange(this.state.selected);
    const options = computePaymentOptions(this.props.cart);
    this.setState({ options });
  }
  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const selected = event.currentTarget.value as PaymentMethod;
    this.setState({ selected });
    this.props.onChange(selected);
  }
  render() {
    return <View
      options={this.state.options}
      selected={this.state.selected}
      onChange={this.onChange}
    />;
  }
}

export default PaymentController;
