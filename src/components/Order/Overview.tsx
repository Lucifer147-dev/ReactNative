import React from 'react';
import { HTMLTable, Classes } from "@blueprintjs/core";
import { Order } from "resources/order";
import { formatPrice } from "utils/common";

interface Props {
  order: Order;
}

const OrderOverview: React.FC<Props> = (props) => {
  const { order } = props;
  return (
    <HTMLTable striped condensed>
      <thead>
        <tr>
          <th>#</th>
          <th>Mô tả</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item, index) =>
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <div>{item.product.name}</div>
              <div className={`${Classes.TEXT_SMALL} ${Classes.TEXT_MUTED}`}>{item.note}</div>
            </td>
            <td>
              <span className={Classes.TEXT_MUTED}>{item.product.unit}</span>
              <span> &times; {item.quantity}</span>
            </td>
            <td style={{ textAlign: "right" }}>
              {formatPrice(item.product.price * item.quantity - item.discount)}
            </td>
          </tr>
        )}

        <tr>
          <td></td>
          <td colSpan={2} style={{ textAlign: "right" }}>Tổng cộng</td>
          <td style={{ textAlign: "right" }}>{formatPrice(order.total)}</td>
        </tr>
      </tbody>
    </HTMLTable>
  )
}

export default OrderOverview;
