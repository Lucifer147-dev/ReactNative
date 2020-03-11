import React from "react";
import { HTMLSelect, Button, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import styles from "./Quantity.module.scss";

interface Props {
  value: number;
  minimal?: boolean;
  onChange: (value: number) => void;
}

class Quantity extends React.Component<Props> {
  bound = (value: number) => value < 1 ? 1 : value;
  increase = () => this.props.onChange(this.props.value + 1);
  decrease = () => this.props.onChange(this.bound(this.props.value - 1));
  onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    this.props.onChange(value);
  }
  render() {
    const options = new Array(10).fill(0).map((_, i) => i + 1);
    return (
      <div className={this.props.minimal ? styles.minimal : styles.main}>
        {!this.props.minimal && <div className={Classes.TEXT_MUTED}>Số lượng</div>}
        <div className={this.props.minimal ? styles.minimalControl : styles.control}>
          <Button disabled={this.props.value === 1} minimal icon={IconNames.MINUS} onClick={this.decrease} />
          <HTMLSelect
            large minimal
            className={styles.select}
            onChange={this.onChange}
            options={options}
            value={this.props.value}
          />
          <Button disabled={this.props.value === options.length} minimal icon={IconNames.PLUS} onClick={this.increase} />
        </div>
      </div>
    )
  }
}

export default Quantity;
