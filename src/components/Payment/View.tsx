import React from "react";
import { Radio, RadioGroup, Classes, FormGroup } from "@blueprintjs/core";

import styles from "./styles.module.scss";
import { PaymentOption } from "resources/payment";
import classNames from "classnames";

interface PaymentViewProps {
  selected: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  options: PaymentOption[];
}

const PaymentView: React.FunctionComponent<PaymentViewProps> = (props) => {
  return (
    <div className={styles.main}>
      <FormGroup label="Chọn hình thức thanh toán">
        <RadioGroup
          onChange={props.onChange}
          selectedValue={props.selected}
          className={styles.control}
        >{
            props.options.map(option => (
              <Radio key={option.method} value={option.method} large label={option.label} disabled={option.disabled}>
                <div className={classNames(Classes.TEXT_SMALL, Classes.TEXT_MUTED)}>{option.description}</div>
                {option.helperText && <div className={classNames(Classes.TEXT_SMALL, Classes.TEXT_DISABLED)}>{option.helperText}</div>}
              </Radio>
            ))
          }
        </RadioGroup>

      </FormGroup>
    </div>
  )
}

export default PaymentView;
