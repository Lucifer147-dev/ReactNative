import React, { ChangeEvent } from "react";

import { CartState } from "store/cart/types";
import { addVoucher } from "store/cart/actions";
import View from "./View";

interface LoginInputProps {
  cart: CartState;
  addVoucher: typeof addVoucher;
}

interface LoginInputState {
  valid?: boolean;
  code: string;
}

class LoginInput extends React.Component<LoginInputProps> {
  phoneInput: HTMLInputElement | null = null;
  state: LoginInputState = { code: "" };


validate = (code: string) => {
  const item = Object.values(this.props.cart.items).find(item => {
    console.log(item.product.vouchers);
    if (item.product.vouchers)  {
      const voucher = item.product.vouchers
        .find(v => v.code.toUpperCase() === code.toUpperCase());
      if (voucher) return true;
    }
    return false;
  });
  if (item) return true;
  return false;
}

  submit = async () => {
    if (this.validate(this.state.code)) {
      this.props.addVoucher(this.state.code);
    } else {
      this.setState({ valid: false });
    }
  }

  change = (event: ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value.toUpperCase();
    this.setState({ code, valid: null });
    if (this.validate(code)) {
      this.setState({ valid: true })
    }
  }

  render() {
    const isVoucherAvailable = Boolean(Object
      .values(this.props.cart.items)
      .find(item => item.product.vouchers && item.product.vouchers.length > 0));
    if (!isVoucherAvailable) return null;
    return <View
      valid={this.state.valid}
      code={this.state.code}
      onChange={this.change}
      onSubmit={this.submit}
    />;
  }
}

export default LoginInput;
