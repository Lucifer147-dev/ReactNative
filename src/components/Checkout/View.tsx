import React from "react"
import { Button } from "@blueprintjs/core";

import Cart from "./Cart";
import Login from "components/Login";
import AddressSelect from "components/Address/Select";
import Payment from "components/Payment";

import styles from "./Checkout.module.scss";
import { Address } from "resources/address";
import { PaymentMethod } from "resources/payment";
import { PTClasses } from "utils/common";
import Panel from "components/Panel";

interface CheckoutViewProps {
  step: number;
  onAddressIdChange: (id: Address["id"]) => void;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onSubmit: () => void;
  isOpenPay?: boolean;
  payUrl?: string;
  closePay: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = (props) => {
  const { step } = props;
  return (
    <div className={styles.main}>
      <div className={styles.cart}><Cart /></div>
      <div className={styles.form}>
        <Panel title="Thông tin của bạn" content={<div>
          <Login />
          {step >= 2 && <AddressSelect onAddressIdChange={props.onAddressIdChange} />}
          {step >= 3 && <Payment onChange={props.onPaymentMethodChange} />}
          {step >= 3 && <Button large text="Đặt hàng" className={PTClasses.CallToAction} onClick={props.onSubmit} />}
        </div>} />
      </div>
    </div>
  )
}

export default CheckoutView;
