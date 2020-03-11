import React from "react";
import { FormGroup, InputGroup, Button, ControlGroup, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { getIntent } from "utils/common";

interface LoginViewProps {
  valid?: boolean;
  error?: Error;
  phone: string;
  onChange: React.FormEventHandler<HTMLElement>;
  onSubmit: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  setPhoneInputRef: (input: InputGroup) => void;
}

const LoginView: React.FC<LoginViewProps> = (props) => {
  const intent = getIntent(!props.error && props.valid);
  const helperText = props.valid === false && "Số điện thoại chưa đúng"
  const leftIcon = props.valid === true ? IconNames.ENDORSED : IconNames.MOBILE_PHONE;
  return (
    <FormGroup
      label="Nhập số điện thoại"
      labelFor="phone-input"
      labelInfo="(dùng để nhận hàng)"
      helperText={props.error ? props.error.message : helperText}
      intent={intent}
    >
      <ControlGroup id="phone-input">
        <InputGroup large
          ref={props.setPhoneInputRef}
          type="tel"
          placeholder="Số điện thoại của bạn"
          value={props.phone}
          intent={intent}
          onChange={props.onChange}
          leftIcon={leftIcon}
          onKeyPress={event => event.key === "Enter" && props.onSubmit()}
          readOnly={props.isLoggedIn}
          rightElement={props.isLoggedIn
            ? <Button text="Thay đổi" intent={Intent.SUCCESS} onClick={props.onLogout} />
            : <Button text="Đồng ý" intent={intent} onClick={props.onSubmit} />
          }
        />

      </ControlGroup>
    </FormGroup>

  );
}

export default LoginView;
