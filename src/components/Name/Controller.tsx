import React, { ChangeEvent } from "react";

import { UserState } from "store/user/types";
import View from "./View";

interface NameInputProps {
  user: UserState;
}

function validateName(name: string) {
  // TODO: Implement better name validation
  if (name.length >= 5) return true;
  return false;
}

class NameInput extends React.Component<NameInputProps> {
  state = { name: "", valid: null };
  validate!: NodeJS.Timeout;
  submitName = async () => {
    if (validateName(this.state.name)) {
      console.log(this.state.name);
    } else {
      this.setState({ valid: false })
    }
  }
  changeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    this.setState({ name, valid: null });
    if (validateName(name)) {
      if (this.validate) clearTimeout(this.validate);
      this.validate = setTimeout(
        () => this.setState({ valid: true }), 500
      )
    }
  }
  render() {
    return <View
      onChange={this.changeName}
      onSubmit={this.submitName}
      name={this.state.name}
      valid={this.state.valid}
    />;
  }
}

export default NameInput;
