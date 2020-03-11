import React from "react";
import { FormGroup, InputGroup, Button, ControlGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { getIntent } from "utils/common";

import styles from './styles.module.scss';

interface VoucherInputProps {
  valid?: boolean;
  code: string;
  onChange: React.FormEventHandler<HTMLElement>;
  onSubmit: () => void;
}

const VoucherInput: React.FC<VoucherInputProps> = (props) => {
  const intent = getIntent(props.valid);
  const helperText = props.valid === false && "Mã giảm giá không đúng"
  const leftIcon = props.valid === true ? IconNames.ENDORSED : IconNames.LABEL;
  return (
    <div className={styles.main}>
      <FormGroup
        label="Mã giảm giá"
        labelFor="voucher-input"
        labelInfo="(nếu có)"
        helperText={helperText}
        intent={intent}
      >
        <ControlGroup id="voucher-input">
          <InputGroup
            large
            className={styles.input}
            type="text"
            placeholder="Nhập mã của bạn"
            value={props.code}
            intent={intent}
            onChange={props.onChange}
            leftIcon={leftIcon}
            onKeyPress={event => event.key === "Enter" && props.onSubmit()}
            rightElement={<Button text="Đồng ý" intent={intent} onClick={props.onSubmit} />}
          />
        </ControlGroup>
      </FormGroup>
    </div>
  );
}

export default VoucherInput;
