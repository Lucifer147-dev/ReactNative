import React, { ChangeEvent } from "react";
import { InputGroup } from "@blueprintjs/core";

import { UserState } from "store/user/types";
import { logout, login } from "store/user/actions";
import { login as userLogin, User } from "resources/user";
import View from "./View";

interface LoginInputProps {
  login: typeof login;
  logout: typeof logout;
  user: UserState;
}

function validatePhone(phone: string) {
  // TODO: Implement better phone validation
  if (phone.length >= 10) return true;
  return false;
}

interface LoginInputState {
  valid?: boolean;
  error?: Error;
  phone: string;
}

class LoginInput extends React.Component<LoginInputProps> {
  phoneInput: HTMLInputElement | null = null;
  state: LoginInputState = { phone: "" };
  submitPhone = async () => {
    if (validatePhone(this.state.phone)) {
      try {
        const user = await userLogin(this.state.phone);
        this.props.login(user);
      } catch (error) {
        this.setState({ error });
      }
    } else {
      this.setState({ valid: false })
    }
  }
  changePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    this.setState({ phone, valid: null, error: undefined });
    if (validatePhone(phone)) {
      this.setState({ valid: true })
    }
  }
  setPhoneInputRef = (input: InputGroup) => {
    this.phoneInput = input as unknown as HTMLInputElement;
  }
  logout = () => {
    this.props.logout();
    // TODO: Find the way to set focus on phone
  }
  render() {
    const isLoggedIn = this.props.user.info !== null;
    return <View
      error={this.state.error}
      setPhoneInputRef={this.setPhoneInputRef}
      isLoggedIn={isLoggedIn}
      valid={isLoggedIn ? true : this.state.valid}
      phone={isLoggedIn ? (this.props.user.info as User).phone : this.state.phone}
      onChange={this.changePhone}
      onSubmit={this.submitPhone}
      onLogout={this.props.logout}
    />;
  }
}

export default LoginInput;
