import React from "react";
import { IconNames, IconName } from "@blueprintjs/icons";
import { Menu, MenuItem, Navbar, Classes, Alignment, AnchorButton, Popover, PopoverInteractionKind, Position, Button } from "@blueprintjs/core";

import { externalLink } from "utils/constants";
import CartMenu from "./CartMenu";
import styles from "./styles.module.scss";
import logo from './logo.svg';
import { Link } from "react-router-dom";

export interface NavItem {
  text: string;
  href: string;
  icon?: IconName;
  target?: string;
  children?: NavItem[];
}

export const NavMenu: NavItem[] = [{
  text: "Mua hàng online",
  href: "/",
  icon: IconNames.HOME,
}, {
  text: "Quà Tết",
  href: "/tet",
  icon: IconNames.BOOK,
}, {
  text: "Giới thiệu",
  href: "/about",
  icon: IconNames.INFO_SIGN,
}, {
  text: "Đại lí & mua sỉ",
  href: externalLink.PARTNERSHIP,
  icon: IconNames.SHOP,
  target: "blank",
}]

const buildMenu = (items: typeof NavMenu) => {
  return <Menu large>
    {items.map(item =>
      <Link to={item.href}>
        <MenuItem key={item.href} text={item.text} icon={item.icon} />
      </Link>
    )}
  </Menu>
}

const HeaderFull: React.FC = () => {
  const condense: React.CSSProperties = { height: 36 };
  return (
    <div className={styles.main}>
      <Navbar style={condense} className={`${Classes.DARK} ${styles.topNav}`}>
        <div className={styles.topNavContainer}>
          <Navbar.Group style={condense} align={Alignment.LEFT}>
            <AnchorButton href="tel:19008688" icon="phone" minimal text="Gọi hotline: 1900-8688" />
          </Navbar.Group>
          <Navbar.Group style={condense} align={Alignment.RIGHT}>
            <CartMenu />
          </Navbar.Group>
        </div>
      </Navbar>
      <Link to="/">
        <img alt="logo" src={logo} className={styles.logo} />
      </Link>
      <Navbar className={styles.navbar}>
        <Navbar.Group align={Alignment.CENTER}>
          {NavMenu.map(item =>
            item.children
              ? <Popover key={item.href} interactionKind={PopoverInteractionKind.HOVER} content={buildMenu(item.children)} position={Position.BOTTOM}>
                <AnchorButton target={item.target} rightIcon={IconNames.CHEVRON_DOWN} large minimal icon={item.icon} text={item.text} href={item.href} />
              </Popover>
              : (
                item.target === 'blank'
                  ? <AnchorButton
                    className={styles.item}
                    target={item.target} large minimal icon={item.icon} text={item.text} href={item.href}
                  />
                  : <Link key={item.href} to={item.href} target={item.target}>
                    <Button className={styles.item} large icon={item.icon} minimal text={item.text} />
                  </Link>)
          )}
        </Navbar.Group>
      </Navbar>
    </div>
  )
};

export default HeaderFull;
