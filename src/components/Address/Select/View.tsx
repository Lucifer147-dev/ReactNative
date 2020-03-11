import React from "react";
import { Radio, RadioGroup, FormGroup, Collapse, Button, Intent, Classes, Popover, ControlGroup, Icon, TagInput } from "@blueprintjs/core";

import styles from "./AddressSelect.module.scss";
import AddressInput from "components/Address/Input";
import { Address, NEW_ADDRESS_ID } from "resources/address";
import { IconNames } from "@blueprintjs/icons";
import { PTClasses } from "utils/common";

interface PaymentViewProps {
  selected?: number;
  addresses: Address[];
  done: boolean;
  onUndone: () => void;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onNewAddressChange: (address: Address) => void;
  submitAddress: () => void;
  onDeleteAddress: (id: Address["id"]) => void;
  createAddressError?: Error;
}

const PaymentView: React.FunctionComponent<PaymentViewProps> = (props) => {
  const selectedAddress: Address = props.done
    ? props.addresses.find(address => address.id === props.selected) as Address
    : {};
  return (
    <div className={styles.main}>
      <FormGroup label="Thông tin giao hàng">
        <div hidden={props.done}>
          <RadioGroup
            onChange={props.onChange}
            selectedValue={props.selected}
            className={styles.control}
          >
            {props.addresses.map(address =>
              <Radio key={address.id} value={address.id} labelElement={
                <div className={styles.radio}>
                  <div>
                    {address.street}
                    <div className={`${Classes.TEXT_SMALL} ${Classes.TEXT_MUTED}`}>
                      {address.ward} - {address.district} - {address.province}
                    </div>
                  </div>
                  <Popover>
                    <Button icon={IconNames.TRASH} minimal text="Xóa" />
                    <div className={styles.confirm}>
                      <div>Bạn có muốn xóa địa chỉ này không?<br />
                        <div className={`${Classes.TEXT_SMALL} ${Classes.TEXT_MUTED}`}>
                          {address.street} - {address.ward} <br /> {address.district} - {address.province}
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                        <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }} text="Không" />
                        <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS} text="Xóa" onClick={() => props.onDeleteAddress(address.id)} />
                      </div>
                    </div>
                  </Popover>
                </div>
              } />
            )}
            <Radio value={NEW_ADDRESS_ID} label="Tạo địa chỉ mới" />
            <Collapse className={styles.new} isOpen={props.selected === NEW_ADDRESS_ID}>
              <AddressInput error={props.createAddressError} onAddressChange={props.onNewAddressChange} />
            </Collapse>
          </RadioGroup>
          <Button
            onClick={props.submitAddress}
            style={{marginTop: 15}}
            className={PTClasses.CallToAction}
            large text="Tiếp tục"
          />
        </div>
        <div hidden={!props.done} className={styles.done}>
          <ControlGroup>
            <TagInput
              className={styles.selectedAddress}
              large
              disabled
              fill
              leftIcon={<Icon className={`${Classes.TAG_INPUT_ICON} ${styles.doneIcon}`} iconSize={Icon.SIZE_STANDARD} icon={IconNames.ENDORSED} intent={Intent.SUCCESS} />}
              // leftIcon={IconNames.ENDORSED}
              intent={Intent.SUCCESS}
              rightElement={
                <Button intent={Intent.SUCCESS} text="Thay đổi" onClick={props.onUndone} />
              }
              values={[selectedAddress.street, selectedAddress.ward, selectedAddress.district, selectedAddress.province]}
              tagProps={{ large: true, minimal: true, multiline: true }}
            />

          </ControlGroup>

        </div>
      </FormGroup>
    </div>
  )
}

export default PaymentView;
