import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Classes, Tooltip, Icon, RadioGroup, Position, Radio } from "@blueprintjs/core";

import { ProductFeature } from "resources/product";
import styles from "./_styles.module.scss";

interface Props {
  feature: ProductFeature;
  selected?: number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const ProductOptionView: React.FC<Props> = (props) => {
  const content = <div className={styles.tooltip}>{props.feature.description}</div>;
  return <div className={styles.main}>
    <div className={Classes.TEXT_MUTED}>
      <span style={{ marginRight: 4 }}>{props.feature.name}</span>
      <Tooltip className={styles.tooltipComponent} position={Position.RIGHT} content={content}>
        <span>
          <Icon icon={IconNames.INFO_SIGN} />
        </span>
      </Tooltip>
    </div>
    <RadioGroup
      inline className={styles.control}
      onChange={props.onChange}
      selectedValue={props.selected}
    >
      {props.feature.options.map(option =>
        <Radio key={option.id} large label={option.name} value={option.id}>
          <div className={`${Classes.TEXT_SMALL} ${Classes.TEXT_MUTED}`}>{option.description}</div>
        </Radio>
      )}
    </RadioGroup>
  </div>
}

export default ProductOptionView;
