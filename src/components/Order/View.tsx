import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Classes, H5, Callout, Intent } from "@blueprintjs/core";

import { Order } from "resources/order";
import { PaymentStatus, PaymentMethod } from "resources/payment";
import styles from './_styles.module.scss';
import packageImage from './package.svg';
import OrderOverview from "./Overview";
import Panel from "components/Panel";
import { PTClasses } from "utils/common";
import classNames from "classnames";

interface Props {
  order: Order;
  onPaymentChange: (method: PaymentMethod) => void;
}

const OrderView: React.FC<Props> = (props) => {
  const { order } = props;
  const isPaymentPending = (
    order.payment &&
    order.payment.method !== PaymentMethod.COD &&
    order.payment.status === PaymentStatus.PENDING
  );

  const isPaymentCancelled = (
    order.payment &&
    order.payment.method !== PaymentMethod.COD &&
    order.payment.status === PaymentStatus.CANCELLED
  );

  const isPaymentCompleted = (
    order.payment &&
    order.payment.method !== PaymentMethod.COD &&
    order.payment.status === PaymentStatus.COMPLETED
  );

  return (
    <div className={styles.main}>
      <div className={styles.orderImage} style={{ backgroundImage: `url(${packageImage})` }}>
        <div className={styles.customerInfo}>
          <div className={styles.recipient}>
            <span className={styles.name}>{order.address.phone} </span>
            {order.address.street}, {order.address.ward}, {order.address.district}, {order.address.province}
          </div>
        </div>
      </div>
      <Panel title="Đặt hàng thành công">
        <div className={classNames(styles.content, Classes.TEXT_LARGE)}>
          <p className={Classes.TEXT_MUTED}>Mã đơn hàng: {order.id}</p>

          {isPaymentCancelled && (
            <div style={{ marginBottom: 20 }}>
              <Callout icon={IconNames.WARNING_SIGN} intent={Intent.PRIMARY} title="Lỗi">
                <div className={Classes.LARGE}>
                  Thanh toán không thành công.<br />
                  Chúng tôi sẽ chủ động liên hệ lại bạn sớm nhất.
                </div>
              </Callout>
            </div>
          )}

          {isPaymentCompleted && (
            <div style={{ marginBottom: 20 }}>
              <Callout icon={IconNames.ENDORSED} intent={Intent.SUCCESS} title="Thanh toán thành công">
                <div className={Classes.LARGE}>
                  Đơn hàng của bạn đã được thanh&nbsp;toán thành&nbsp;công.<br />
                </div>
              </Callout>
            </div>
          )}

          <H5>Tổng quan đơn hàng</H5>
          <OrderOverview order={order} />
          {isPaymentPending && (
            <AnchorButton
              style={{ marginTop: 12 }}
              large className={PTClasses.CallToAction} href={order.payment.url} rightIcon={IconNames.SHARE} text="Thanh toán" />
          )}

          <p style={{ marginTop: 12 }} className={`${Classes.RUNNING_TEXT} ${Classes.TEXT_LARGE}`}>
            Phát Thành xin cảm ơn quý khách đã đặt hàng.<br />
            <em>Nếu quý khách có bất cứ yêu cầu hay thay đổi về đơn hàng xin hãy liên hệ số hotline 19008688</em>
          </p>
        </div>
      </Panel>

    </div>
  )
}

export default OrderView;
