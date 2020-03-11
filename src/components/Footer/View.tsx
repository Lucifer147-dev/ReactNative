import React from 'react';
import classNames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { Classes, AnchorButton, Menu } from '@blueprintjs/core';

import Panel from 'components/Panel';
import styles from './styles.module.scss';
import { externalLink, internalLink } from 'utils/constants';

const Footer: React.FC = () => {
  const menuStyle = { margin: -5, padding: 0, marginBottom: 5 };
  return (
    <div className={classNames(styles.main)}>
      <div className={classNames(styles.container, styles.row)}>
        <Panel small title="Nội dung">
          <Menu style={menuStyle} large className={styles.content}>
            <Menu.Item target="/" icon={IconNames.SHOPPING_CART} text="Mua hàng online" />
            <Menu.Item href="/tet" icon={IconNames.BOOK} text="Quà Tết" />
            <Menu.Item href="/about" icon={IconNames.INFO_SIGN} text="Giới thiệu" />
            <Menu.Item target="blank" href={externalLink.PARTNERSHIP} icon={IconNames.SHOP} text="Đại lí & Mua sỉ" />
            <Menu.Item text="Các chính sách" icon={IconNames.PROJECTS}>
              <Menu.Item
                icon={IconNames.LOCK}
                href={internalLink.POLICY.PAYMENT}
                text="Bảo mật thanh toán"
              />
              <Menu.Item
                icon={IconNames.PERSON}
                href={internalLink.POLICY.PRIVACY}
                text="Bảo vệ thông tin người tiêu dùng"
              />
              <Menu.Item
                icon={IconNames.BOX}
                href={internalLink.POLICY.SHIPPING_AND_RETURNS}
                text="Giao nhận, vận chuyển và hoàn tiền"
              />
            </Menu.Item>
          </Menu>
        </Panel>


        <div>
          <Panel small title="PHẢN HỒI">
            <Menu style={menuStyle} large className={styles.content}>
              <Menu.Item target="blank" href={externalLink.FEEDBACK.BUG} icon={IconNames.APPLICATION} text="Báo lỗi phần mềm" />
              <Menu.Item target="blank" href={externalLink.FEEDBACK.QUALITY} icon={IconNames.BOX} text="Chất lượng sản phẩm" />
              <Menu.Item target="blank" href={externalLink.FEEDBACK.OTHER} icon={IconNames.CHAT} text="Phản hồi khác" />
            </Menu>

            <div className={Classes.TEXT_MUTED}>Phản hồi của quý khách sẽ được gửi trực tiếp đến Ban Giám đốc của Phát Thành.</div>
          </Panel>
        </div>

        <div>
          <Panel small title="THANH TOÁN">
            <div className={styles.paymentlist}>
              <img alt="momo" style={{ height: 48 }} src="/static/payment/momo.png" />
              <img alt="zalopay" className={styles.paymentPending} style={{ height: 48 }} src="/static/payment/zalopay.png" />
            </div>
            <div className={Classes.TEXT_MUTED}>Chúng tôi sẽ tích cực cập nhật những hình thức thanh toán mới để phục vụ quý khách.</div>

            <div style={{marginTop: 8}}>
              <a target="blank" href={externalLink.GOV}>
                <img alt="online.gov.vn" style={{ width: 150 }} src="/static/gov.png" />
              </a>
              <div className={Classes.TEXT_MUTED}>Website của Phát Thành được Bộ Công Thương kiểm duyệt kể từ ngày 21/03/2019. Quý khách hoàn toàn yên tâm khi mua hàng tại đây.</div>
            </div>
          </Panel>
        </div>
      </div>

      <div className={classNames(styles.nav, Classes.DARK)}>
        <div className={classNames(styles.container, styles.bot)}>
          <div style={{ padding: 5 }}>
            <span className={Classes.TEXT_MUTED}>©&nbsp;</span>
            <span>{Math.max(new Date().getFullYear(), 2019)} Công ty TNHH SX&TM Cà Phê Phát Thành</span>
          </div>
          <div>
            <AnchorButton minimal icon={IconNames.PHONE} href={externalLink.HOTLINE}>Hotline: 1900-8688</AnchorButton>
          </div>
          <AnchorButton
            minimal icon={IconNames.MAP_MARKER} rightIcon={IconNames.SHARE}
            target="blank"
            href={externalLink.GOOGLE_MAP}>987 Tạ Quang Bửu, Phường 6, Quận 8, TPHCM</AnchorButton>
        </div>
      </div>

    </div>
  )
}

export default Footer;
