import React from "react";
import View from "./View";
import { Order, getOrder } from "resources/order";
import { Spinner } from "@blueprintjs/core";
import { match } from "react-router";
import { PaymentMethod } from "resources/payment";

interface State {
  order?: Order;
  paymentMethod?: PaymentMethod;
}

interface Props {
  match: match<{orderId: string}>;
  token: string;
}

class OrderController extends React.Component<Props, State> {
  state: State = {}
  async componentDidMount() {
    const { orderId } = this.props.match.params;
    const order = await getOrder(this.props.token, orderId);
    this.setState({ order });
  }
  onPaymentChange = (paymentMethod: PaymentMethod) => {
    this.setState({ paymentMethod })
  }
  render() {
    const { order } = this.state;
    if (!order) return <Spinner />
    return <View
      onPaymentChange={this.onPaymentChange}
      order={order}
    />;
  }
}

export default OrderController;
