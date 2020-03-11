import React from "react";
import { FormGroup, InputGroup, ControlGroup, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

const getIntent = (valid: NameViewProps["valid"]) => {
  if (valid === true) return Intent.PRIMARY;
  if (valid === false) return Intent.DANGER;
  return Intent.NONE;
}

interface NameViewProps {
  valid: boolean | null;
  name: string;
  onChange: React.FormEventHandler<HTMLElement>;
  onSubmit: () => void;
}

const NameView: React.FC<NameViewProps> = (props) => {
  const intent = getIntent(props.valid)
  const leftIcon = props.valid === true ? IconNames.ENDORSED : IconNames.USER;
  return (
    <FormGroup
      intent={intent}
      label="Nhập tên của bạn"
      labelFor="name-input"
    >
      <ControlGroup id="name-input">
        <InputGroup large
          type="text"
          name="name"
          intent={intent}
          leftIcon={leftIcon}
          placeholder="Tên của bạn"
          value={props.name}
          onChange={props.onChange}
          onKeyPress={event => event.key === "Enter" && props.onSubmit()}
        />
      </ControlGroup>
    </FormGroup>

  );
}

export default NameView;
