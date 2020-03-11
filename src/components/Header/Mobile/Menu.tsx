import React from "react";
import classNames from "classnames";
import { Drawer, Position, Menu, Classes, Navbar, Alignment, AnchorButton } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { externalLink } from "utils/constants";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderMobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer lazy className={styles.drawer} position={Position.LEFT} size="70%" onClose={onClose} isOpen={isOpen}>
      <Navbar className={classNames(styles.sideNav, Classes.DARK)}>
        <Navbar.Group align={Alignment.LEFT}>
          <AnchorButton large icon={IconNames.MENU} minimal onClick={onClose} />
        </Navbar.Group>
        <div className={classNames(styles.welcome, Classes.TEXT_MUTED)}>Phát Thành kính chúc quý khách một ngày tốt lành</div>
      </Navbar>

      <div className={styles.content}>
        <div className={styles.menuContainer}>
          <Menu className={styles.menu} large>
            <Menu.Item href="/" icon={IconNames.SHOPPING_CART} text="Mua hàng online" />
            <Menu.Item href="/tet" icon={IconNames.BOOK} text="Quà Tết" />
            <Menu.Divider />
            <Menu.Item href="/about" icon={IconNames.INFO_SIGN} text="Giới thiệu" />
            <Menu.Item target="blank" href={externalLink.PARTNERSHIP} icon={IconNames.SHOP} text="Đại lí & Mua sỉ" />
            <Menu.Divider />
            <Menu.Item href={externalLink.HOTLINE} icon={IconNames.PHONE} text="Hotline: 1900-8688" />
            <Menu.Item href={externalLink.GOOGLE_MAP} target="blank" icon={IconNames.MAP_MARKER} text="Google Map" />
          </Menu>
        </div>


        <div className={styles.footer}>
          <div className={Classes.TEXT_SMALL} style={{ textAlign: "left" }}>
            <div>Công ty TNHH SX&TM Cà&nbsp;Phê&nbsp;Phát&nbsp;Thành</div>
            <div className={classNames(Classes.TEXT_SMALL, Classes.TEXT_MUTED)}>
              <div>987 Tạ Quang Bửu, Phường&nbsp;6, Quận&nbsp;8 Thành&nbsp;phố Hồ&nbsp;Chí&nbsp;Minh</div>
            </div>
          </div>
        </div>
      </div>


    </Drawer>
  )
}

export default HeaderMobileMenu;
