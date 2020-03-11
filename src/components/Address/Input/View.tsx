import React from "react";
import Media from "react-media";
import { HTMLSelect, ControlGroup, InputGroup, Intent, FormGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { Address, AddressPart } from "resources/address";
import styles from "./AddressInput.module.scss"
import { getIntent } from "utils/common";

interface AddressInputViewProps {
  address: Address;
  valid?: boolean;
  error?: Error;

  provinces?: AddressPart[];
  districts?: AddressPart[];
  wards?: AddressPart[];

  setStreet: React.FormEventHandler<HTMLElement>;
  setProvince: React.ChangeEventHandler<HTMLSelectElement>;
  setDistrict: React.ChangeEventHandler<HTMLSelectElement>;
  setWard: React.ChangeEventHandler<HTMLSelectElement>;
}

const sortAddressParts = (parts?: AddressPart[]) => {
  if (!parts) return;
  return parts.sort((a, b) => {
    if (a.name.length < b.name.length) return -1;
    if (a.name.length > b.name.length) return 1;
    return a.name.localeCompare(b.name);
  })
}

const AddressInputView: React.FC<AddressInputViewProps> = (props) => {
  const { error } = props;
  const provinces = props.provinces && props.provinces.sort((a, b) => a.name.localeCompare(b.name));
  const wards = sortAddressParts(props.wards);
  const districts = sortAddressParts(props.districts);
  return (
    <div className={styles.main}>
      <Media query={{ maxWidth: 700 }}>
        {(isPhone: boolean) =>
          <FormGroup
            style={{ marginBottom: 0 }}
            helperText={error && error.message}
            intent={error ? Intent.DANGER : Intent.NONE}
          >
            <ControlGroup vertical={isPhone} id="address-input" fill>
              <HTMLSelect
                large
                disabled={districts === undefined}
                value={props.address.provinceId}
                onChange={props.setProvince}
                className={props.address.provinceId ? styles.done : styles.pending}
                iconProps={props.address.provinceId ? { icon: IconNames.ENDORSED, intent: Intent.SUCCESS } : { icon: IconNames.CHEVRON_DOWN }}
              >
                <option disabled>Chọn tỉnh/thành</option>
                {provinces && provinces.map(({ id, name }) => <option key={id} label={name} value={id}>{name}</option>)}
              </HTMLSelect>
              <HTMLSelect
                large
                value={props.address.districtId}
                disabled={districts === undefined}
                onChange={props.setDistrict}
                className={props.address.districtId ? styles.done : styles.pending}
                iconProps={props.address.districtId ? { icon: IconNames.ENDORSED, intent: Intent.SUCCESS } : { icon: IconNames.CHEVRON_DOWN }}
                defaultValue="0"
              >
                <option disabled value="0">Chọn quận/huyện</option>
                {districts && districts.map(({ id, name }) => <option key={id} label={name} value={id}>{name}</option>)}
              </HTMLSelect>
              <HTMLSelect
                large
                disabled={wards === undefined}
                value={props.address.wardId}
                className={props.address.wardId ? styles.done : styles.pending}
                iconProps={props.address.wardId ?
                  { icon: IconNames.ENDORSED, intent: Intent.SUCCESS } :
                  { icon: IconNames.CHEVRON_DOWN }}
                onChange={props.setWard}
                defaultValue="0"
              >
                <option disabled value="0" label="Chọn phường/xã" />
                {wards && wards.map(({ id, name }) => <option key={id} label={name} value={id}>{name}</option>)}
              </HTMLSelect>
            </ControlGroup>
            <InputGroup
              fill
              intent={getIntent(props.valid)}
              onChange={props.setStreet}
              value={props.address.street}
              leftIcon={IconNames.GEOLOCATION}
              className={styles.recipient}
              large placeholder="Số nhà, tên đường" />
          </FormGroup>
        }
      </Media>
    </div>
  );
}

export default AddressInputView;
